import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { PlaidAccount } from './entities/plaid-account.entity';
import { PlaidAccountsController } from './plaid-accounts.controller';
import { PlaidAccountsService } from './plaid-accounts.service';

describe('PlaidAccountsController', () => {
  let controller: PlaidAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      controllers: [PlaidAccountsController],
      providers: [PlaidAccountsService],
    }).compile();

    controller = module.get<PlaidAccountsController>(PlaidAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
