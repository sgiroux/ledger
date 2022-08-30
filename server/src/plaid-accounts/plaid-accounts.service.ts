import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaidItem } from '../plaid-items/entities/plaid-item.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { PlaidAccount } from './entities/plaid-account.entity';

@Injectable()
export class PlaidAccountsService {
  constructor(
    @InjectRepository(PlaidAccount)
    private plaidAccountsRepository: Repository<PlaidAccount>,
  ) {}

  async deleteById(user: User, id: number) {
    const plaidAccount = await this.selectById(user, id);

    await this.plaidAccountsRepository.remove(plaidAccount);

    //TODO: Delete the PlaidItem if there are no longer any accounts associated with it.
  }

  async selectById(user: User, id: number) {
    const plaidAccount = await this.plaidAccountsRepository.findOne({
      where: {
        id: id,
        plaidItem: {
          user: {
            id: user.id,
          },
        },
      },
    });

    if (!plaidAccount) {
      throw new NotFoundException();
    }

    return plaidAccount;
  }

  async selectAllByPlaidItem(plaidItem: PlaidItem): Promise<PlaidAccount[]> {
    return this.plaidAccountsRepository.find({
      where: {
        plaidItem: {
          id: plaidItem.id,
        },
      },
    });
  }

  async selectAllByUser(user: User): Promise<PlaidAccount[]> {
    return this.plaidAccountsRepository.find({
      relations: {
        plaidItem: false,
      },
      where: {
        plaidItem: {
          user: {
            id: user.id,
          },
        },
      },
    });
  }
}
