import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PlaidModule } from './plaid/plaid.module';
import { ConfigurationUtil } from './shared/configuration-util';
import { ItemsModule } from './items/items.module';
import { AccountsModule } from './accounts/accounts.module';
import { OauthModule } from './oauth/oauth.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { LoggerModule } from 'nestjs-pino';
import { SyncModule } from './sync/sync.module';
import { StatsModule } from './stats/stats.module';
import { RulesModule } from './rules/rules.module';
import { getNestDataSource } from './datasource';
import { SystemModule } from './system/system.module';

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
    TypeOrmModule.forRoot(getNestDataSource().options),
    UsersModule,
    PlaidModule,
    OauthModule,
    ItemsModule,
    AccountsModule,
    AuthModule,
    TransactionsModule,
    TasksModule,
    SyncModule,
    StatsModule,
    RulesModule,
    SystemModule,
  ],
  providers: [
    // Throtlling for all controllers
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
