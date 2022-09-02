import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaidAccount } from '../../plaid-accounts/entities/plaid-account.entity';
import { PlaidItem } from '../../plaid-items/entities/plaid-item.entity';
import { PlaidTransaction } from '../../plaid-transactions/entities/plaid-transaction.entity';
import { Rule } from '../../rules/entities/rule.entity';
import { ConfigurationUtil } from '../../shared/configuration-util';
import { User } from '../../users/entities/user.entity';

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [User, PlaidItem, PlaidAccount, PlaidTransaction, Rule],
    synchronize: true,
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    validate: ConfigurationUtil.validateConfig,
  }),
  CacheModule.register({
    isGlobal: true,
  }),

  ScheduleModule.forRoot(),
  TypeOrmModule.forFeature([
    User,
    PlaidItem,
    PlaidAccount,
    PlaidTransaction,
    Rule,
  ]),
];
