import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { UsersModule } from '../users/users.module';
import { TestingService } from '../testing/testing.service';
import { User } from '../users/entities/user.entity';
import {
  EnvironmentVariable,
  getEnvironmentVariable,
} from '../utils/configuration-util';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingModule(),
        JwtModule.register({
          secret: getEnvironmentVariable(EnvironmentVariable.JWT_SECRET),
          signOptions: { expiresIn: '7d' },
        }),
        UsersModule,
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    const testingService = module.get<TestingService>(TestingService);
    await testingService.createMockData();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a valid user', async () => {
    const user = await service.validateUser(
      'allen.grant@gmail.com',
      'velociraptor',
    );
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  it('should not validate a non-valid user', async () => {
    const user = await service.validateUser(
      'allen.grant@gmail.com',
      'velociraptor123',
    );
    expect(user).toBeNull();
  });
});
