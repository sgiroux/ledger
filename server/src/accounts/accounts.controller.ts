import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APIRequest } from '../types';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Account } from './entities/account.entity';

@Controller('/accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiOkResponse({ type: Account, isArray: true })
  @Get()
  async selectAll(@Req() request: APIRequest) {
    return await this.accountsService.selectAllByUser(request.user);
  }

  @ApiOkResponse({ type: Account })
  @Get(':id')
  async selectById(@Req() request: APIRequest, @Param('id') id: number) {
    return await this.accountsService.selectById(request.user, id);
  }

  @ApiOkResponse()
  @Delete(':id')
  async delete(@Req() request: APIRequest, @Param('id') id: number) {
    return await this.accountsService.deleteById(request.user, id);
  }
}
