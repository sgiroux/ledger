import { Module } from '@nestjs/common';
import { PlaidAccountsService } from './plaid-accounts.service';
import { PlaidAccountsController } from './plaid-accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaidAccount } from './entities/plaid-account.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlaidAccount]), UsersModule],
  exports: [PlaidAccountsService],
  controllers: [PlaidAccountsController],
  providers: [PlaidAccountsService],
})
export class PlaidAccountsModule {}
