import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Account } from '../accounts/entities/account.entity';
import { Item } from '../items/entities/item.entity';
import { Rule } from '../rules/entities/rule.entity';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class TestingService {
  constructor(private dataSource: DataSource) {}

  deleteUsers = async () => {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Transaction)
      .execute();
    await this.dataSource.createQueryBuilder().delete().from(Account).execute();
    await this.dataSource.createQueryBuilder().delete().from(Item).execute();
    await this.dataSource.createQueryBuilder().delete().from(Rule).execute();
    await this.dataSource.createQueryBuilder().delete().from(User).execute();
  };

  createMockData = async () => {
    const createUserDto = new CreateUserDTO();
    createUserDto.email = 'allen.grant@gmail.com';
    const hashedPassword = await bcrypt.hash('velociraptor', 10);
    createUserDto.password = hashedPassword;
    const user: User = this.dataSource.manager.create<User>(
      User,
      createUserDto,
    );

    //create some rules
    const rule1 = new Rule();
    rule1.criteria = 'rule1_criteria';
    rule1.field = 'transactionId';
    rule1.isEnabled = true;
    rule1.name = 'rule1';
    rule1.operation = 'equals';
    rule1.user = user;

    const rule2 = new Rule();
    rule2.criteria = 'rule2_criteria';
    rule2.field = 'transactionId';
    rule2.isEnabled = true;
    rule2.name = 'rule2';
    rule2.operation = 'equals';
    rule2.user = user;

    const item = new Item();
    item.accessToken = 'mock-access-token';
    item.itemId = 'mock-item';
    item.updateType = 'background';
    item.user = user;

    // create some accounts
    const checkingAccount = new Account();
    checkingAccount.accountId = 'mock-account-checking-id';
    checkingAccount.mask = '0000';
    checkingAccount.name = 'mock-account-checking';
    checkingAccount.officialName = 'mock-account-checking-official';
    checkingAccount.subtype = 'checking';
    checkingAccount.type = 'depository';
    checkingAccount.item = item;

    const creditAccount = new Account();
    creditAccount.accountId = 'mock-account-credit-id';
    creditAccount.mask = '0000';
    creditAccount.name = 'mock-account-credit';
    creditAccount.officialName = 'mock-account-credit-official';
    creditAccount.subtype = 'credit card';
    creditAccount.type = 'credit';
    creditAccount.item = item;

    await this.dataSource.manager.save(user);
    await this.dataSource.manager.save([rule1, rule2]);
    await this.dataSource.manager.save(item);
    await this.dataSource.manager.save([checkingAccount, creditAccount]);
  };
}
