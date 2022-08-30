import { Module } from '@nestjs/common';
import { PlaidTransactionsService } from './plaid-transactions.service';
import { PlaidTransactionsController } from './plaid-transactions.controller';
import { PlaidTransaction } from './entities/plaid-transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { RulesModule } from '../rules/rules.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaidTransaction]),
    UsersModule,
    RulesModule,
  ],
  controllers: [PlaidTransactionsController],
  providers: [PlaidTransactionsService],
  exports: [PlaidTransactionsService],
})
export class PlaidTransactionsModule {}
