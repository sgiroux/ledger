import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PlaidClient } from './plaid.client';
import { PlaidService } from './plaid.service';

describe('PlaidService', () => {
  let service: PlaidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PlaidService, PlaidClient],
    }).compile();

    service = module.get<PlaidService>(PlaidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
