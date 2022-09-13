import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Item } from '../../items/entities/item.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Rule } from '../../rules/entities/rule.entity';
import { ConfigurationUtil } from '../../shared/configuration-util';
import { User } from '../../users/entities/user.entity';

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [User, Item, Account, Transaction, Rule],
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
  TypeOrmModule.forFeature([User, Item, Account, Transaction, Rule]),
];
