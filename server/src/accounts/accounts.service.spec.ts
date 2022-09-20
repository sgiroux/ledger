import { Test, TestingModule } from '@nestjs/testing';
import { TestingService } from '../testing/testing.service';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    const testingService = module.get<TestingService>(TestingService);
    await testingService.createMockData();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('selectAllByUserId - should return all accounts for a user', async () => {
    const accounts = await service.selectAllByUserId(1);
    expect(accounts).toBeInstanceOf(Array);
    expect(accounts).toHaveLength(2);
  });

  it('selectAllByItemId - should return all accounts for an item', async () => {
    const accounts = await service.selectAllByItemId(1);
    expect(accounts).toBeInstanceOf(Array);
    expect(accounts).toHaveLength(2);
  });

  it('selectById - should return an account by id', async () => {
    const account = await service.selectById(1, 1);
    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBe(1);
  });

  it('deleteById - should delete an account by id', async () => {
    await service.deleteById(1, 1);

    const accounts = await service.selectAllByUserId(1);
    expect(accounts).toBeInstanceOf(Array);
    expect(accounts).toHaveLength(1);
    expect(accounts[0].id).toBe(2);
  });
});
