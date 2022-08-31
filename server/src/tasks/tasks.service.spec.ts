import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { SyncModule } from '../sync/sync.module';
import { UsersModule } from '../users/users.module';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), SyncModule, UsersModule],
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
