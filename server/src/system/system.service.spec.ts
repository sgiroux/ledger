import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { SystemService } from './system.service';

describe('SystemService', () => {
  let service: SystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemService],
      imports: [...TypeOrmTestingModule(), UsersModule, AuthModule],
    }).compile();

    service = module.get<SystemService>(SystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
