import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';

describe('SystemController', () => {
  let controller: SystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemController],
      providers: [SystemService],
      imports: [...TypeOrmTestingModule(), UsersModule, AuthModule],
    }).compile();

    controller = module.get<SystemController>(SystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
