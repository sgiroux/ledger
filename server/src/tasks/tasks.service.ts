import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PlaidItemsService } from '../plaid-items/plaid-items.service';
import { SyncService } from '../sync/sync.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly syncService: SyncService,
    private readonly usersService: UsersService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async syncTransactions() {
    this.logger.debug('Scheduled Task: SyncTransactions Started');
    const users = await this.usersService.selectAll();
    for (const user of users) {
      await this.syncService.startSync(user);
    }
    this.logger.debug('Scheduled Task: SyncTransactions Finished');
  }

  @Cron(CronExpression.EVERY_HOUR)
  async refreshTransactions() {
    this.logger.debug('Scheduled Task: RefreshTransactions Started');
    const users = await this.usersService.selectAll();
    for (const user of users) {
      //await this.syncService.startSync(user);
    }
    this.logger.debug('Scheduled Task: RefreshTransactions Finished');
  }
}
