import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async selectAllByUser(user: User): Promise<Item[]> {
    return await this.itemRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }
}
