import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

@Injectable()
export class PlaidClient {
  public readonly client;

  constructor(private readonly configService: ConfigService) {
    const config = new Configuration({
      basePath: PlaidEnvironments[this.configService.get('PLAID_ENVIRONMENT')],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': this.configService.get('PLAID_CLIENT_ID'),
          'PLAID-SECRET': this.configService.get('PLAID_SECRET'),
        },
      },
    });
    this.client = new PlaidApi(config);
  }
}
