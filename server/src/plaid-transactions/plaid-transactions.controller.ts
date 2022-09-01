import {
  Controller,
  Get,
  UseGuards,
  Req,
  Query,
  DefaultValuePipe,
  Param,
  ParseIntPipe,
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
    @Query('offset', new DefaultValuePipe(0)) offset: number,
  ) {
    return await this.plaidTransactionsService.selectAllByUser(
      request.user,
      true,
      limit,
      offset,
    );
  }

  @Get(':id')
  async selectById(
    @Req() request: APIRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.plaidTransactionsService.selectById(request.user, id);
  }
}
