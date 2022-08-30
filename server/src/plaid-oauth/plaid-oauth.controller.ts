import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APIRequest } from '../types';
import { ExchangeTokenDTO } from './dto/exchange-token-dto';
import { PlaidOauthService } from './plaid-oauth.service';

@Controller('plaid/oauth')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlaidOauthController {
  constructor(private readonly plaidOauthService: PlaidOauthService) {}

  @Post('/create_link_token')
  async create_link_token(@Req() request: APIRequest) {
    try {
      return await this.plaidOauthService.createLinkToken(request.user);
    } catch (err) {}
  }

  @Post('/exchange_token')
  async exchange_token(
    @Req() request: APIRequest,
    @Body() exchangeTokenDto: ExchangeTokenDTO,
  ) {
    await this.plaidOauthService.saveAccounts(
      request.user,
      exchangeTokenDto.publicToken,
    );
  }
}
