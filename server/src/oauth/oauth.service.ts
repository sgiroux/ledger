import { Injectable } from '@nestjs/common';
import { Account } from '../accounts/entities/account.entity';
import { Item } from '../items/entities/item.entity';
import { PlaidService } from '../plaid/plaid.service';
import { User } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { LinkTokenDTO } from './dto/link-token.dto';

@Injectable()
export class OauthService {
  constructor(
    private readonly plaidService: PlaidService,
    private dataSource: DataSource,
  ) {}

  async createLinkToken(user: User) {
    const linkToken = await this.plaidService.createLinkToken(user.id);
    const linkTokenDTO = new LinkTokenDTO();
    linkTokenDTO.token = linkToken.link_token;

    return linkTokenDTO;
  }

  async saveAccounts(user: User, publicToken: string) {
    const exchangeAccessTokenResponse = await this.plaidService.exchangeToken(
      publicToken,
    );

    const getAccountsResponse = await this.plaidService.getAccounts(
      exchangeAccessTokenResponse.access_token,
    );

    await this.dataSource.transaction(async (manager) => {
      const item = new Item();
      item.accessToken = exchangeAccessTokenResponse.access_token;
      item.updateType = getAccountsResponse.item.update_type;
      item.itemId = getAccountsResponse.item.item_id;
      item.user = user;

      const accounts = getAccountsResponse.accounts.map((remoteAccount) => {
        const account = new Account();
        account.accountId = remoteAccount.account_id;
        account.mask = remoteAccount.mask;
        account.name = remoteAccount.name;
        account.officialName = remoteAccount.official_name;
        account.subtype = remoteAccount.subtype;
        account.type = remoteAccount.type;
        account.item = item;

        return account;
      });
      await manager.save(item);
      await manager.save(accounts);
    });
  }
}
