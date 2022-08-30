import { Injectable } from '@nestjs/common';
import { PlaidTransactionsService } from '../plaid-transactions/plaid-transactions.service';
import { User } from '../users/entities/user.entity';
import { DailyDataPointsDTO } from './dto/daily-data-point.dto';
import { SummaryStatsDTO } from './dto/summary-stats.dto';
import * as moment from 'moment';
import { PlaidAccountsService } from '../plaid-accounts/plaid-accounts.service';
import { RulesService } from '../rules/rules.service';

@Injectable()
export class StatsService {
  constructor(
    private readonly plaidTransactionsService: PlaidTransactionsService,
    private readonly plaidAccountsService: PlaidAccountsService,
    private readonly rulesService: RulesService,
  ) {}

  async getSummaryStats(user: User) {
    const summaryStatsDTO = new SummaryStatsDTO();
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');

    // Get number of accounts
    const accounts = await this.plaidAccountsService.selectAllByUser(user);
    summaryStatsDTO.numAccounts = accounts.length;

    const rules = await this.rulesService.selectAllByUser(user);
    summaryStatsDTO.numRules = rules.length;

    //get the list of transactions
    const transactions = await this.plaidTransactionsService.selectAllByUser(
      user,
      true,
    );
    const lastThirtyDaysOfTransaction = transactions.filter(
      (plaidTransaction) => {
        return (
          plaidTransaction.date >= startDate && plaidTransaction.date <= endDate
        );
      },
    );

    // Group amount by keys
    const amountsByDate = lastThirtyDaysOfTransaction.reduce(
      (accumulator: any, transaction) => {
        if (!accumulator[transaction.date]) {
          const dailyDataPointsDTO = new DailyDataPointsDTO();
          dailyDataPointsDTO.date = transaction.date;
          dailyDataPointsDTO.value = 0;
          accumulator[transaction.date] = dailyDataPointsDTO;
        }
        accumulator[transaction.date].value += transaction.amount;

        return accumulator;
      },
      {},
    );

    const dailyDataPoints: DailyDataPointsDTO[] = Object.values(amountsByDate);

    summaryStatsDTO.dailyDataPoints = dailyDataPoints;
    summaryStatsDTO.transactions = lastThirtyDaysOfTransaction;

    if (dailyDataPoints.length > 0) {
      summaryStatsDTO.costliestDate = dailyDataPoints.reduce(
        (prev, current) => {
          if (current.value > prev.value) {
            return current;
          } else {
            return prev;
          }
        },
      ).date;
    }

    if (lastThirtyDaysOfTransaction.length) {
      summaryStatsDTO.largestTransaction = lastThirtyDaysOfTransaction.reduce(
        (prev, current) => {
          if (current.amount > prev.amount) {
            return current;
          } else {
            return prev;
          }
        },
      );
    }

    summaryStatsDTO.totalSpend = lastThirtyDaysOfTransaction.reduce(
      (accumulator, transaction) => {
        return accumulator + transaction.amount;
      },
      0,
    );

    return summaryStatsDTO;
  }
}
