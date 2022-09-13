import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  accountId: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  mask: string | null;

  @Column()
  name: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  officialName: string | null;

  @Column({
    nullable: true,
    type: 'text',
  })
  subtype: string | null;

  @Column()
  type: string;

  @ManyToOne(() => Item, (item) => item.accounts, {
    nullable: false,
  })
  item: Item;

  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    nullable: false,
  })
  transactions: Transaction[];
}
