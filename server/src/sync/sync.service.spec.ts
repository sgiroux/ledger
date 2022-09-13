import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '../accounts/accounts.module';
import { ItemsModule } from '../items/items.module';
import { PlaidModule } from '../plaid/plaid.module';
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
        ItemsModule,
        AccountsModule,
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
