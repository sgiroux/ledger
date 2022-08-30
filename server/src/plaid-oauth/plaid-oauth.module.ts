import { Module } from '@nestjs/common';
import { PlaidOauthService } from './plaid-oauth.service';
import { PlaidOauthController } from './plaid-oauth.controller';
import { PlaidModule } from '../plaid/plaid.module';
import { PlaidAccountsModule } from '../plaid-accounts/plaid-accounts.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PlaidModule, PlaidAccountsModule, UsersModule],
  controllers: [PlaidOauthController],
  providers: [PlaidOauthService],
})
export class PlaidOauthModule {}
