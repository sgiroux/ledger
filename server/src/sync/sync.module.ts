import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { UsersModule } from '../users/users.module';
import { PlaidAccountsModule } from '../plaid-accounts/plaid-accounts.module';
import { PlaidItemsModule } from '../plaid-items/plaid-items.module';
import { PlaidModule } from '../plaid/plaid.module';

@Module({
  imports: [UsersModule, PlaidAccountsModule, PlaidItemsModule, PlaidModule],
  controllers: [SyncController],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}
