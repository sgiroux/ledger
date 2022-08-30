import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaidItem } from './entities/plaid-item.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PlaidItemsService {
  private readonly logger = new Logger(PlaidItemsService.name);

  constructor(
    @InjectRepository(PlaidItem)
    private plaidItemRepository: Repository<PlaidItem>,
  ) {}

  async selectAllByUser(user: User): Promise<PlaidItem[]> {
    return await this.plaidItemRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }
}
