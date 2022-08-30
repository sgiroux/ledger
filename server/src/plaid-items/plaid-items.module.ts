import { Module } from '@nestjs/common';
import { PlaidItemsService } from './plaid-items.service';
import { PlaidItemsController } from './plaid-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaidItem } from './entities/plaid-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaidItem])],
  controllers: [PlaidItemsController],
  providers: [PlaidItemsService],
  exports: [PlaidItemsService],
})
export class PlaidItemsModule {}
