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
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APIRequest } from '../types';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly plaidTransactionsService: TransactionsService) {}

  @ApiOkResponse({ type: Transaction, isArray: true })
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

  @ApiOkResponse({ type: Transaction })
  @Get(':id')
  async selectById(
    @Req() request: APIRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.plaidTransactionsService.selectById(request.user, id);
  }
}
