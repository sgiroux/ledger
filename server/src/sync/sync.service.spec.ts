import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PlaidAccountsModule } from '../plaid-accounts/plaid-accounts.module';
import { PlaidItemsModule } from '../plaid-items/plaid-items.module';
import { PlaidModule } from '../plaid/plaid.module';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { SyncModule } from './sync.module';
import { SyncService } from './sync.service';

describe('SyncService', () => {
  let service: SyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingModule(),
        PlaidItemsModule,
        PlaidAccountsModule,
        PlaidModule,
        SyncModule,
        UsersModule,
      ],
      providers: [SyncService],
    }).compile();

    service = module.get<SyncService>(SyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
