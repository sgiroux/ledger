import { Injectable, Logger } from '@nestjs/common';
import { PlaidClient } from './plaid.client';
import {
  CountryCode,
  Products,
  AccountsGetResponse,
  TransactionsSyncRequest,
  CategoriesGetResponse,
} from 'plaid';
import axios, { AxiosError } from 'axios';

@Injectable()
export class PlaidService {
  private readonly logger = new Logger(PlaidService.name);

  constructor(private readonly plaidClient: PlaidClient) {}

  private extractErrorMessage(err: AxiosError) {
    if (err.response) {
      return err.response.data.error_message;
    } else {
      return err.toString();
    }
  }

  private extractErrorCode(err: AxiosError) {
    if (err.response) {
      return err.response.data.error_code;
    } else {
      return err.toString();
    }
  }

  async getCategories(): Promise<CategoriesGetResponse> {
    try {
      const response = await this.plaidClient.client.categoriesGet({});
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        this.logger.error(
          `Error retrieving accounts: ${this.extractErrorCode(
            err,
          )} - ${this.extractErrorMessage(err)}`,
        );
      }
      throw err;
    }
  }

  async getAccounts(accessToken: string): Promise<AccountsGetResponse> {
    try {
      const response = await this.plaidClient.client.accountsGet({
        access_token: accessToken,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        this.logger.error(
          `Error retrieving accounts: ${this.extractErrorCode(
            err,
          )} - ${this.extractErrorMessage(err)}`,
        );
      }
      throw err;
    }
  }

  async syncTransactions(accessToken: string, cursor?: string) {
    const request: TransactionsSyncRequest = {
      access_token: accessToken,
      cursor: cursor,
      count: 500,
      options: {
        //include_personal_finance_category: true,
      },
    };

    try {
      const response = await this.plaidClient.client.transactionsSync(request);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        this.logger.error(
          `Error retrieving accounts: ${this.extractErrorCode(
            err,
          )} - ${this.extractErrorMessage(err)}`,
        );
      }
      throw err;
    }
  }

  async exchangeToken(publicToken: string) {
    try {
      const response = await this.plaidClient.client.itemPublicTokenExchange({
        public_token: publicToken,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        this.logger.error(
          `Error retrieving accounts: ${this.extractErrorCode(
            err,
          )} - ${this.extractErrorMessage(err)}`,
        );
      }
      throw err;
    }
  }

  async createLinkToken(userId: number) {
    const request = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: userId.toString(),
      },
      client_name: 'Ledger',
      products: [Products.Transactions],
      language: 'en',
      //webhook: 'https://webhook.example.com',
      redirect_uri: 'https://dev.anzu.com/link/finish',
      country_codes: [CountryCode.Us],
    };
    try {
      const createTokenResponse = await this.plaidClient.client.linkTokenCreate(
        request,
      );
      return createTokenResponse.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        this.logger.error(
          `Error retrieving accounts: ${this.extractErrorCode(
            err,
          )} - ${this.extractErrorMessage(err)}`,
        );
      }
      throw err;
    }
  }
}
