import { Module } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidClient } from './plaid.client';

@Module({
  providers: [PlaidService, PlaidClient],
  exports: [PlaidService],
})
export class PlaidModule {}
