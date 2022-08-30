import {
  Controller,
  Get,
  UseGuards,
  Req,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APIRequest } from '../types';
import { PlaidTransactionsService } from './plaid-transactions.service';

@Controller('plaid/transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlaidTransactionsController {
  constructor(
    private readonly plaidTransactionsService: PlaidTransactionsService,
  ) {}

  @Get()
  async selectAll(
    @Req() request: APIRequest,
    @Query('limit', new DefaultValuePipe(100)) limit: number,
  ) {
    return await this.plaidTransactionsService.selectAllByUser(
      request.user,
      true,
      limit,
    );
  }
}
