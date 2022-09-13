import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../items/entities/item.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async deleteById(user: User, id: number) {
    const account = await this.selectById(user, id);

    await this.accountsRepository.remove(account);

    //TODO: Delete the PlaidItem if there are no longer any accounts associated with it.
  }

  async selectById(user: User, id: number) {
    const account = await this.accountsRepository.findOne({
      where: {
        id: id,
        item: {
          user: {
            id: user.id,
          },
        },
      },
    });

    if (!account) {
      throw new NotFoundException();
    }

    return account;
  }

  async selectAllByItem(item: Item): Promise<Account[]> {
    return this.accountsRepository.find({
      where: {
        item: {
          id: item.id,
        },
      },
    });
  }

  async selectAllByUser(user: User): Promise<Account[]> {
    return this.accountsRepository.find({
      where: {
        item: {
          user: {
            id: user.id,
          },
        },
      },
    });
  }
}
