import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { AccountsModule } from '../accounts/accounts.module';
import { RulesModule } from '../rules/rules.module';

@Module({
  imports: [TransactionsModule, AccountsModule, RulesModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
