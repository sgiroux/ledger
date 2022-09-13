import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { PlaidModule } from '../plaid/plaid.module';
import { AccountsModule } from '../accounts/accounts.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PlaidModule, AccountsModule, UsersModule],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
