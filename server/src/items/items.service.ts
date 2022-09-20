import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async selectAllByUserId(userId: number): Promise<Item[]> {
    return await this.itemRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
