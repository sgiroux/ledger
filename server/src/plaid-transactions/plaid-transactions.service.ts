import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaidTransaction } from './entities/plaid-transaction.entity';
import { Repository } from 'typeorm';
import { RulesService } from '../rules/rules.service';

@Injectable()
export class PlaidTransactionsService {
  private readonly logger = new Logger(PlaidTransactionsService.name);

  constructor(
    @InjectRepository(PlaidTransaction)
    private plaidTransactionsRepository: Repository<PlaidTransaction>,
    private rulesService: RulesService,
  ) {}

  async selectById(user: User, id: number) {
    const transaction = await this.plaidTransactionsRepository.findOne({
      where: {
        id: id,
        plaidAccount: {
          plaidItem: {
            user: {
              id: user.id,
            },
          },
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException();
    }

    return transaction;
  }

  async selectAllByUser(
    user: User,
    applyFilters: boolean,
    limit?: number,
    offset?: number,
  ) {
    const transactions = await this.plaidTransactionsRepository.find({
      relations: {
        plaidAccount: {
          plaidItem: true,
        },
      },
      where: {
        plaidAccount: {
          plaidItem: {
            user: {
              id: user.id,
            },
          },
        },
      },
      order: {
        date: 'DESC',
      },
      take: limit,
    });

    if (applyFilters) {
      return await this.applyRules(user, transactions);
    }

    return transactions;
  }

  private async applyRules(user: User, transactions: PlaidTransaction[]) {
    const rules = await this.rulesService.selectAllByUser(user);

    let filteredTransactions = transactions;
    // Run each rule
    rules.forEach((rule) => {
      if (rule.isEnabled) {
        this.logger.debug(`Running rule: ${rule.name}`);

        switch (rule.operation) {
          case 'contains':
            filteredTransactions = filteredTransactions.filter(
              (transaction) => {
                const fieldValue = transaction[rule.field];
                return fieldValue.includes(rule.criteria) === false;
              },
            );
            break;

          case 'equals':
            filteredTransactions = filteredTransactions.filter(
              (transaction) => {
                const fieldValue = transaction[rule.field];
                return fieldValue !== rule.criteria;
              },
            );
            break;

          default:
            throw new Error(`Unsupport Operation: ${rule.operation}`);
        }
        filteredTransactions = filteredTransactions.filter((transaction) => {
          return transaction.name.includes(rule.criteria) === false;
        });
      } else {
        this.logger.debug(`Skipping rule (disabled): ${rule.name}`);
      }
    });

    return filteredTransactions;
  }
}
