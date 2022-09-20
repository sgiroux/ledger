import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PlaidModule } from './plaid/plaid.module';
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
import { LoggerMiddleware } from './shared/middleware/logging.middleware';
import { v4 as uuidv4 } from 'uuid';
import { ReqId } from 'pino-http';
import { IncomingMessage } from 'http';
import { validateEnvironmentVariables } from './utils/configuration-util';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        customProps: () => ({
          context: 'HTTP',
        }),
        genReqId: (req: IncomingMessage): ReqId => {
          const id = uuidv4();
          req.headers['X-Request-Id'] = id;

          return id;
        },
        transport: {
          target: 'pino-pretty',
          options: {
            destination: `${
              process.env.CONFIG_DIRECTORY || './config/'
            }/combined.log`,
            mkdir: true,
            singleLine: true,
            colorize: true,
            sync: true,
            levelFirst: false,
            translateTime: "yyyy-MM-dd'T'HH:mm:ss.l'Z'",
            messageFormat: '{req.headers.X-Request-Id} [{context}] {msg}',
            ignore: 'pid,hostname,context,res,req, responseTime', //req,
            errorLikeObjectKeys: ['err', 'error'],
          },
        },
        useLevel: 'debug',
        // Define a custom receive message
        customReceivedMessage: function (req, _res) {
          return `Start - path: ${req.url} | method: ${req.method}`;
          //return 'request received: ' + req.method
        },
        customSuccessMessage: function (req, res) {
          if (res.statusCode === 404) {
            return 'resource not found';
          }
          return `${req.method} completed`;
        },
      },
    }),
    CacheModule.register({
      isGlobal: true,
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
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

validateEnvironmentVariables();
