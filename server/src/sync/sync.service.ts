import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { User } from '../users/entities/user.entity';
import { Cache } from 'cache-manager';
import { SyncStatusDTO } from './dto/sync-status.dto';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../users/users.service';
import { AccountsService } from '../accounts/accounts.service';
import { PlaidService } from '../plaid/plaid.service';
import { RemovedTransaction, Transaction as PlaidTransaction } from 'plaid';
import { Account } from '../accounts/entities/account.entity';
import { DataSource, EntityManager } from 'typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly itemsService: ItemsService,
    private readonly accountsService: AccountsService,
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
    remoteTransactions: Array<PlaidTransaction>,
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

    filteredRemoteTransactions.forEach(async (remoteTransaction) => {
      const transactions = await entityManager.find(Transaction, {
        where: {
          transactionId: remoteTransaction.transaction_id,
        },
      });

      transactions.forEach(async (transaction) => {
        transaction.amount = remoteTransaction.amount;
        transaction.date = remoteTransaction.date;
        transaction.datetime = remoteTransaction.datetime;
        transaction.isoCurrencyCode = remoteTransaction.iso_currency_code;
        transaction.name = remoteTransaction.name;
        transaction.pending = remoteTransaction.pending;
        transaction.categoryId = remoteTransaction.category_id;
        transaction.transactionId = remoteTransaction.transaction_id;
        transaction.paymentChannel = remoteTransaction.payment_channel;
        transaction.merchantName = remoteTransaction.merchant_name || null;
        transaction.category = remoteTransaction.category;

        await entityManager.save(transaction);
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

    await remoteTransactions.forEach(async (remoteTransaction) => {
      await entityManager.delete(Transaction, {
        remoteId: remoteTransaction.transaction_id,
      });
    });
  }

  private async processAddedTransactions(
    entityManager: EntityManager,
    remoteTransactions: Array<PlaidTransaction>,
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

    const transactions = filteredRemoteTransactions.map((remoteTransaction) => {
      const transaction = new Transaction();
      transaction.amount = remoteTransaction.amount;
      transaction.date = remoteTransaction.date;
      transaction.datetime = remoteTransaction.datetime;
      transaction.isoCurrencyCode = remoteTransaction.iso_currency_code;
      transaction.name = remoteTransaction.name;
      transaction.pending = remoteTransaction.pending;
      transaction.transactionId = remoteTransaction.transaction_id;
      transaction.paymentChannel = remoteTransaction.payment_channel;
      transaction.merchantName = remoteTransaction.merchant_name || null;
      transaction.categoryId = remoteTransaction.category_id;
      transaction.paymentChannel = remoteTransaction.payment_channel;
      transaction.category = remoteTransaction.category;

      transaction.account = plaidAccountIdToAccount.get(
        remoteTransaction.account_id,
      );

      return transaction;
    });
    await entityManager.save(transactions);
  }

  private async sync(jobName: string, userId: number) {
    try {
      this.logger.debug(`${jobName} starting`);

      await this.cacheManager.set(jobName, new SyncStatusDTO('RUNNING', 0), {
        ttl: 60 * 1, // 1 minute timeout.
      });

      const user = await this.usersService.getUserById(userId);
      const items = await this.itemsService.selectAllByUser(user);

      for (const item of items) {
        const accounts = await this.accountsService.selectAllByItem(item);

        if (accounts.length === 0) {
          this.logger.warn(
            `Item-${item.id} has not associated accounts. Aborting.`,
          );
          continue;
        }

        // Create a mapping of accountId to account objects for faster lookup
        const plaidAccountIdToAccount = new Map<string, Account>();
        accounts.forEach((account) =>
          plaidAccountIdToAccount.set(account.accountId, account),
        );

        let hasMoreTransactions = false;
        do {
          const syncTransactionsResponse =
            await this.plaidService.syncTransactions(
              item.accessToken,
              item.transactionSyncCursor,
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

            item.transactionSyncCursor = syncTransactionsResponse.next_cursor;
            await manager.save(item);
          });
          hasMoreTransactions = syncTransactionsResponse.has_more;
        } while (hasMoreTransactions);
      }

      this.logger.debug(`${jobName} completed successfully`);
    } finally {
      this.logger.debug(`${jobName} delete job from scheduler`);
      this.schedulerRegistry.deleteTimeout(jobName);

      this.logger.debug(`${jobName} deleting job from cache`);
      await this.cacheManager.del(jobName);
    }
  }
}
