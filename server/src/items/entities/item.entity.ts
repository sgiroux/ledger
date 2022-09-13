import { Account } from '../../accounts/entities/account.entity';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  itemId: string;

  @Column()
  updateType: string;

  @Column()
  @Exclude()
  accessToken: string;

  @Column({
    nullable: true,
  })
  transactionSyncCursor?: string;

  @ManyToOne(() => User, (user) => user.items, {
    nullable: false,
  })
  user: User;

  @OneToMany(() => Account, (account) => account.item, {
    nullable: false,
  })
  accounts: Account[];
}
