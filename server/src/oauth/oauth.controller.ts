import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APIRequest } from '../types';
import { ExchangeTokenDTO } from './dto/exchange-token.dto';
import { LinkTokenDTO } from './dto/link-token.dto';
import { OauthService } from './oauth.service';

@Controller('/oauth')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @ApiOkResponse({ type: LinkTokenDTO })
  @Post('/create_link_token')
  async create_link_token(@Req() request: APIRequest) {
    try {
      return await this.oauthService.createLinkToken(request.user);
    } catch (err) {}
  }

  @ApiNoContentResponse()
  @Post('/exchange_token')
  async exchange_token(
    @Req() request: APIRequest,
    @Body() exchangeTokenDto: ExchangeTokenDTO,
  ) {
    await this.oauthService.saveAccounts(
      request.user,
      exchangeTokenDto.publicToken,
    );
  }
}
