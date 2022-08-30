import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { PlaidTransactionsModule } from '../plaid-transactions/plaid-transactions.module';
import { PlaidAccountsModule } from '../plaid-accounts/plaid-accounts.module';
import { RulesModule } from '../rules/rules.module';

@Module({
  imports: [PlaidTransactionsModule, PlaidAccountsModule, RulesModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
