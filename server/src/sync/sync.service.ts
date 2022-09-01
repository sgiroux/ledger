import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { User } from '../users/entities/user.entity';
import { Cache } from 'cache-manager';
import { SyncStatusDTO } from './dto/sync-status-dto';
import { PlaidItemsService } from '../plaid-items/plaid-items.service';
import { UsersService } from '../users/users.service';
import { PlaidAccountsService } from '../plaid-accounts/plaid-accounts.service';
import { PlaidService } from '../plaid/plaid.service';
import { RemovedTransaction, Transaction } from 'plaid';
import { PlaidAccount } from '../plaid-accounts/entities/plaid-account.entity';
import { DataSource, EntityManager } from 'typeorm';
import { PlaidTransaction } from '../plaid-transactions/entities/plaid-transaction.entity';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly plaidItemsService: PlaidItemsService,
    private readonly plaidAccountsService: PlaidAccountsService,
    private readonly plaidService: PlaidService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async startSync(user: User) {
    const jobName = this.getJobName(user);

    // create a background job.
    const createSyncJob = (jobName: string, userId: number) => {
      return async () => {
        try {
          await this.sync(jobName, userId);
        } catch (err) {
          this.logger.error(`Error running syncJob: ${err}`);
        }
      };
    };

    try {
      this.schedulerRegistry.getTimeout(jobName);
      this.logger.debug(`${jobName} already exists`);
    } catch (err) {
      // "No Timeout was found with the given name (1-sync). Check that you created one with a decorator or with the create API."
      this.logger.debug(`${jobName} does not exist.  Creating.`);
      const job = setTimeout(createSyncJob(jobName, user.id), 0);
      this.schedulerRegistry.addTimeout(jobName, job);
    }
  }

  async getStatus(user: User) {
    const jobName = this.getJobName(user);
    const syncStatusDTO = await this.cacheManager.get<SyncStatusDTO>(jobName);

    if (!syncStatusDTO) {
      return new SyncStatusDTO('NOT_RUNNING', 0);
    }
    return syncStatusDTO;
  }

  private getJobName(user: User) {
    return `${user.id}-sync`;
  }

  private async processModifiedTransactions(
    entityManager: EntityManager,
    remoteTransactions: Array<Transaction>,
    plaidAccountIdToAccount: Map<any, any>, //TODO: Make this more strongly types
  ) {
    this.logger.debug(
      `Processing modified transactions. ${remoteTransactions.length} records`,
    );

    // Remove transactions for accounts we don't know about.
    const filteredRemoteTransactions = remoteTransactions.filter(
      (remoteTransaction) =>
        plaidAccountIdToAccount.get(remoteTransaction.account_id) !== undefined,
    );

    filteredRemoteTransactions.forEach(async (remotePlaidTransaction) => {
      const plaidTransactions = await entityManager.find(PlaidTransaction, {
        where: {
          transactionId: remotePlaidTransaction.transaction_id,
        },
      });

      plaidTransactions.forEach(async (plaidTransaction) => {
        plaidTransaction.amount = remotePlaidTransaction.amount;
        plaidTransaction.date = remotePlaidTransaction.date;
        plaidTransaction.datetime = remotePlaidTransaction.datetime;
        plaidTransaction.isoCurrencyCode =
          remotePlaidTransaction.iso_currency_code;
        plaidTransaction.name = remotePlaidTransaction.name;
        plaidTransaction.pending = remotePlaidTransaction.pending;
        plaidTransaction.categoryId = remotePlaidTransaction.category_id;
        plaidTransaction.transactionId = remotePlaidTransaction.transaction_id;
        plaidTransaction.paymentChannel =
          remotePlaidTransaction.payment_channel;
        plaidTransaction.merchantName =
          remotePlaidTransaction.merchant_name || null;
        plaidTransaction.category = remotePlaidTransaction.category;

        await entityManager.save(plaidTransaction);
      });
    });
  }

  private async processRemovedTransactions(
    entityManager: EntityManager,
    remoteTransactions: Array<RemovedTransaction>,
  ) {
    this.logger.debug(
      `Processing removed transactions. ${remoteTransactions.length} records`,
    );

    await remoteTransactions.forEach(async (remotePlaidTransaction) => {
      await entityManager.delete(PlaidTransaction, {
        transactionId: remotePlaidTransaction.transaction_id,
      });
    });
  }

  private async processAddedTransactions(
    entityManager: EntityManager,
    remoteTransactions: Array<Transaction>,
    plaidAccountIdToAccount: Map<any, any>, //TODO: Make this more strongly types
  ) {
    this.logger.debug(
      `Processing added transactions. ${remoteTransactions.length} records`,
    );

    // Remove transactions for accounts we don't know about.
    const filteredRemoteTransactions = remoteTransactions.filter(
      (remoteTransaction) =>
        plaidAccountIdToAccount.get(remoteTransaction.account_id) !== undefined,
    );

    const plaidTransactions = filteredRemoteTransactions.map(
      (remotePlaidTransaction) => {
        const plaidTransaction = new PlaidTransaction();
        plaidTransaction.amount = remotePlaidTransaction.amount;
        plaidTransaction.date = remotePlaidTransaction.date;
        plaidTransaction.datetime = remotePlaidTransaction.datetime;
        plaidTransaction.isoCurrencyCode =
          remotePlaidTransaction.iso_currency_code;
        plaidTransaction.name = remotePlaidTransaction.name;
        plaidTransaction.pending = remotePlaidTransaction.pending;
        plaidTransaction.transactionId = remotePlaidTransaction.transaction_id;
        plaidTransaction.paymentChannel =
          remotePlaidTransaction.payment_channel;
        plaidTransaction.merchantName =
          remotePlaidTransaction.merchant_name || null;
        plaidTransaction.categoryId = remotePlaidTransaction.category_id;
        plaidTransaction.paymentChannel =
          remotePlaidTransaction.payment_channel;
        plaidTransaction.category = remotePlaidTransaction.category;

        plaidTransaction.plaidAccount = plaidAccountIdToAccount.get(
          remotePlaidTransaction.account_id,
        );

        return plaidTransaction;
      },
    );
    await entityManager.save(plaidTransactions);
  }

  private async sync(jobName: string, userId: number) {
    try {
      this.logger.debug(`${jobName} starting`);

      await this.cacheManager.set(jobName, new SyncStatusDTO('RUNNING', 0), {
        ttl: 60 * 1, // 1 minute timeout.
      });

      const user = await this.usersService.getUserById(userId);
      const plaidItems = await this.plaidItemsService.selectAllByUser(user);

      for (const plaidItem of plaidItems) {
        const plaidAccounts =
          await this.plaidAccountsService.selectAllByPlaidItem(plaidItem);

        if (plaidAccounts.length === 0) {
          this.logger.warn(
            `PlaidItem-${plaidItem.id} has not associated accounts. Aborting.`,
          );
          continue;
        }

        // Create a mapping of accountId to account objects for faster lookup
        const plaidAccountIdToAccount = new Map<string, PlaidAccount>();
        plaidAccounts.forEach((plaidAccount) =>
          plaidAccountIdToAccount.set(plaidAccount.accountId, plaidAccount),
        );

        let hasMoreTransactions = false;
        do {
          const syncTransactionsResponse =
            await this.plaidService.syncTransactions(
              plaidItem.accessToken,
              plaidItem.transactionSyncCursor,
            );

          await this.dataSource.transaction(async (manager) => {
            await this.processAddedTransactions(
              manager,
              syncTransactionsResponse.added,
              plaidAccountIdToAccount,
            );

            await this.processRemovedTransactions(
              manager,
              syncTransactionsResponse.removed,
            );

            await this.processModifiedTransactions(
              manager,
              syncTransactionsResponse.modified,
              plaidAccountIdToAccount,
            );

            plaidItem.transactionSyncCursor =
              syncTransactionsResponse.next_cursor;
            await manager.save(plaidItem);
          });
          hasMoreTransactions = syncTransactionsResponse.has_more;
        } while (hasMoreTransactions);
      }

      this.logger.debug(`${jobName} completed successfully`);
    } finally {
      this.logger.debug(`${jobName} delete job from scheduler`);
      this.schedulerRegistry.deleteTimeout(jobName);

      this.logger.debug(`${jobName} deleting job from cache`);
      this.cacheManager.del(jobName);
    }
  }
}
