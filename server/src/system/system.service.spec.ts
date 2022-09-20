import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { TestingService } from '../testing/testing.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UsersModule } from '../users/users.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { SystemService } from './system.service';

describe('SystemService', () => {
  let service: SystemService;
  let testingService: TestingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemService],
      imports: [...TypeOrmTestingModule(), UsersModule, AuthModule],
    }).compile();

    service = module.get<SystemService>(SystemService);
    testingService = module.get<TestingService>(TestingService);
    await testingService.createMockData();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getStatus: should return isInitialized is true if a user is found', async () => {
    const status = await service.getStatus();
    expect(status.isInitialized).toBe(true);
  });

  it('initialize: should can not be called twice', async () => {
    const createUserDTO = new CreateUserDTO();
    createUserDTO.email = 'allen.grant@gmail.com';
    createUserDTO.password = 'password';
    await expect(service.initialize(createUserDTO)).rejects.toThrowError(
      BadRequestException, // TODO: S.G. This should throw a non nest exception
    );
  });

  it('initialize: should be able to be called when no users are present', async () => {
    await testingService.deleteUsers();

    const createUserDTO = new CreateUserDTO();
    createUserDTO.email = 'allen.grant@gmail.com';
    createUserDTO.password = 'password';
    const response = await service.initialize(createUserDTO);
    expect(response.accessToken).toBeDefined();
  });
});
