import { PlaidAccount } from '../../plaid-accounts/entities/plaid-account.entity';
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
export class PlaidItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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

  @ManyToOne(() => User, (user) => user.plaidItems, {
    nullable: false,
  })
  user: User;

  @OneToMany(() => PlaidAccount, (plaidAccount) => plaidAccount.plaidItem, {
    nullable: false,
  })
  plaidAccounts: PlaidAccount[];
}
