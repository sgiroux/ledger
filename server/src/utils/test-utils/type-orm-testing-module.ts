import { CacheModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Item } from '../../items/entities/item.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Rule } from '../../rules/entities/rule.entity';
import { User } from '../../users/entities/user.entity';
import { TestingModule } from '../../testing/testing.module';

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: ['./src/**/*.entity.ts'],
    synchronize: true,
    logging: false,
  }),
  CacheModule.register({
    isGlobal: true,
  }),
  TestingModule,
  ScheduleModule.forRoot(),
  TypeOrmModule.forFeature([User, Item, Account, Transaction, Rule]),
];

export const createMockAPIRequest = (userId: number) => {
  return {
    user: {
      id: userId,
    },
  };
};
