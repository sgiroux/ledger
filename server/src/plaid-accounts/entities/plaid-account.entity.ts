import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaidItem } from '../../plaid-items/entities/plaid-item.entity';
import { PlaidTransaction } from '../../plaid-transactions/entities/plaid-transaction.entity';

@Entity()
export class PlaidAccount {
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

  @ManyToOne(() => PlaidItem, (plaidItem) => plaidItem.plaidAccounts, {
    nullable: false,
  })
  plaidItem: PlaidItem;

  @OneToMany(
    () => PlaidTransaction,
    (plaidTransaction) => plaidTransaction.plaidAccount,
    {
      nullable: false,
    },
  )
  plaidTransactions: PlaidTransaction[];
}
