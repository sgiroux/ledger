import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { UsersModule } from '../users/users.module';
import { AccountsModule } from '../accounts/accounts.module';
import { ItemsModule } from '../items/items.module';
import { PlaidModule } from '../plaid/plaid.module';

@Module({
  imports: [UsersModule, AccountsModule, ItemsModule, PlaidModule],
  controllers: [SyncController],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}
