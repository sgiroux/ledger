import { Test, TestingModule } from '@nestjs/testing';
import { OauthService } from './oauth.service';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { PlaidModule } from '../plaid/plaid.module';

describe('OauthService', () => {
  let service: OauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), PlaidModule],
      providers: [OauthService],
    }).compile();

    service = module.get<OauthService>(OauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
