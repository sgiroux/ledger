import { Test, TestingModule } from '@nestjs/testing';
import { PlaidOauthService } from './plaid-oauth.service';
import { AppModule } from '../app.module';

describe('PlaidOauthService', () => {
  let service: PlaidOauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PlaidOauthService],
    }).compile();

    service = module.get<PlaidOauthService>(PlaidOauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
