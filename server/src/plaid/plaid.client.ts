import { Injectable } from '@nestjs/common';
import { Configuration, PlaidApi } from 'plaid';
import process from 'process';
import {
  EnvironmentVariable,
  getEnvironmentVariable,
} from '../utils/configuration-util';

@Injectable()
export class PlaidClient {
  public readonly client;

  constructor() {
    const config = new Configuration({
      basePath: getEnvironmentVariable(EnvironmentVariable.PLAID_ENVIRONMENT),
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': getEnvironmentVariable(
            EnvironmentVariable.PLAID_CLIENT_ID,
          ),
          'PLAID-SECRET': getEnvironmentVariable(
            EnvironmentVariable.PLAID_SECRET,
          ),
        },
      },
    });
    this.client = new PlaidApi(config);
  }
}
