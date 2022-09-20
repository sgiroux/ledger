import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async deleteById(userId: number, id: number) {
    const account = await this.selectById(userId, id);

    await this.accountsRepository.remove(account);

    //TODO: Delete the PlaidItem if there are no longer any accounts associated with it.
  }

  async selectById(userId: number, id: number) {
    const account = await this.accountsRepository.findOne({
      where: {
        id: id,
        item: {
          user: {
            id: userId,
          },
        },
      },
    });

    if (!account) {
      throw new NotFoundException();
    }

    return account;
  }

  async selectAllByItemId(itemId: number): Promise<Account[]> {
    return this.accountsRepository.find({
      where: {
        item: {
          id: itemId,
        },
      },
    });
  }

  async selectAllByUserId(userId: number): Promise<Account[]> {
    return this.accountsRepository.find({
      where: {
        item: {
          user: {
            id: userId,
          },
        },
      },
    });
  }
}
