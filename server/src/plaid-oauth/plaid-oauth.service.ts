import { Injectable } from '@nestjs/common';
import { PlaidAccount } from '../plaid-accounts/entities/plaid-account.entity';
import { PlaidItem } from '../plaid-items/entities/plaid-item.entity';
import { PlaidService } from '../plaid/plaid.service';
import { User } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PlaidOauthService {
  constructor(
    private readonly plaidService: PlaidService,
    private dataSource: DataSource,
  ) {}

  createLinkToken(user: User) {
    return this.plaidService.createLinkToken(user.id);
  }

  async saveAccounts(user: User, publicToken: string) {
    const exchangeAccessTokenResponse = await this.plaidService.exchangeToken(
      publicToken,
    );

    const getAccountsResponse = await this.plaidService.getAccounts(
      exchangeAccessTokenResponse.access_token,
    );

    await this.dataSource.transaction(async (manager) => {
      const plaidItem = new PlaidItem();
      plaidItem.accessToken = exchangeAccessTokenResponse.access_token;
      plaidItem.updateType = getAccountsResponse.item.update_type;
      plaidItem.itemId = getAccountsResponse.item.item_id;
      plaidItem.user = user;

      const plaidAccounts = getAccountsResponse.accounts.map(
        (remotePlaidAccount) => {
          const plaidAccount = new PlaidAccount();
          plaidAccount.accountId = remotePlaidAccount.account_id;
          plaidAccount.mask = remotePlaidAccount.mask;
          plaidAccount.name = remotePlaidAccount.name;
          plaidAccount.officialName = remotePlaidAccount.official_name;
          plaidAccount.subtype = remotePlaidAccount.subtype;
          plaidAccount.type = remotePlaidAccount.type;
          plaidAccount.plaidItem = plaidItem;

          return plaidAccount;
        },
      );
      await manager.save(plaidItem);
      await manager.save(plaidAccounts);
    });
  }
}
