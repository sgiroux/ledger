import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PlaidAccountsService } from './plaid-accounts.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APIRequest } from '../types';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('plaid/accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlaidAccountsController {
  constructor(private readonly plaidAccountsService: PlaidAccountsService) {}

  @Get()
  async selectAll(@Req() request: APIRequest) {
    return await this.plaidAccountsService.selectAllByUser(request.user);
  }

  @Get(':id')
  async selectById(@Req() request: APIRequest, @Param('id') id: number) {
    return await this.plaidAccountsService.selectById(request.user, id);
  }

  @Delete(':id')
  async delete(@Req() request: APIRequest, @Param('id') id: number) {
    return await this.plaidAccountsService.deleteById(request.user, id);
  }
}
