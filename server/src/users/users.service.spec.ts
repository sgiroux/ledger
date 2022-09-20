import { Test, TestingModule } from '@nestjs/testing';
import { QueryFailedError } from 'typeorm';
import { TestingService } from '../testing/testing.service';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    const testingService = module.get<TestingService>(TestingService);
    await testingService.createMockData();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('selectAll - should return all users', async () => {
    const users = await service.selectAll();
    expect(users).toBeInstanceOf(Array);
    expect(users).toHaveLength(1);
    expect(users[0]).toBeInstanceOf(User);
  });

  it('getUserByEmail - should return a user if a record with an email is found', async () => {
    const email = 'allen.grant@gmail.com';
    const user = await service.getUserByEmail(email);

    if (!user) {
      throw new Error('User is null');
    }
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(email);
  });

  it('getUserByEmail - should return null if a record with an email is not found', async () => {
    const email = 'not.found@gmail.com';
    const user = await service.getUserByEmail(email);
    expect(user).toBeNull();
  });

  it('create - should create a new user', async () => {
    const email = 'giroux@gmail.com';
    const createUserDTO = new CreateUserDTO();
    createUserDTO.email = email;
    createUserDTO.password = 'password';
    const user = await service.create(createUserDTO);

    if (!user) {
      throw new Error('User is null');
    }

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(email);
  });

  it('create - should throw an error on duplicate email', async () => {
    const email = 'allen.grant@gmail.com';
    const createUserDTO = new CreateUserDTO();
    createUserDTO.email = email;
    createUserDTO.password = 'password';

    await expect(service.create(createUserDTO)).rejects.toThrow(
      QueryFailedError,
    );
  });
});
