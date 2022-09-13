import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '../accounts/accounts.module';
import { ItemsModule } from '../items/items.module';
import { PlaidModule } from '../plaid/plaid.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

describe('SyncController', () => {
  let controller: SyncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingModule(),
        ItemsModule,
        AccountsModule,
        PlaidModule,
        UsersModule,
      ],
      controllers: [SyncController],
      providers: [SyncService],
    }).compile();

    controller = module.get<SyncController>(SyncController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
