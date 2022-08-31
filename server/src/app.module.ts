import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { PlaidModule } from './plaid/plaid.module';
import { ConfigurationUtil } from './shared/configuration-util';
import { PlaidItemsModule } from './plaid-items/plaid-items.module';
import { PlaidAccountsModule } from './plaid-accounts/plaid-accounts.module';
import { PlaidOauthModule } from './plaid-oauth/plaid-oauth.module';
import { PlaidItem } from './plaid-items/entities/plaid-item.entity';
import { PlaidAccount } from './plaid-accounts/entities/plaid-account.entity';
import { AuthModule } from './auth/auth.module';
import { PlaidTransactionsModule } from './plaid-transactions/plaid-transactions.module';
import { PlaidTransaction } from './plaid-transactions/entities/plaid-transaction.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { LoggerModule } from 'nestjs-pino';
import { LoggerMiddleware } from './shared/middleware/logging.middleware';
import { SyncModule } from './sync/sync.module';
import { StatsModule } from './stats/stats.module';
import { RulesModule } from './rules/rules.module';
import { Rule } from './rules/entities/rule.entity';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            //destination: `${__dirname}/combined.log`,
            mkdir: true,
            singleLine: true,
            colorize: true,
            sync: true,
            levelFirst: false,
            translateTime: "yyyy-MM-dd'T'HH:mm:ss.l'Z'",
            messageFormat:
              'df{req.headers["x-correlation-id"]} [{context}] {msg}',
            ignore: 'pid,hostname,context,res,req, responseTime', //req,
            errorLikeObjectKeys: ['err', 'error'],
          },
        },
      },
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: ConfigurationUtil.validateConfig,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 5,
      limit: 20,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      //useFactory: async (configService: ConfigService) => ({
      useFactory: async () => ({
        type: 'better-sqlite3',
        //database: `./db/db.sqlite3`,
        database: `db.sqlite3`,
        entities: [User, PlaidItem, PlaidAccount, PlaidTransaction, Rule],
        synchronize: true,
        //logging: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PlaidModule,
    PlaidOauthModule,
    PlaidItemsModule,
    PlaidAccountsModule,
    AuthModule,
    PlaidTransactionsModule,
    TasksModule,
    SyncModule,
    StatsModule,
    RulesModule,
  ],
  providers: [
    // Throtlling for all controllers
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [UsersModule, PlaidItemsModule, PlaidModule, PlaidAccountsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
