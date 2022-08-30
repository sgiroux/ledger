import { PlaidAccount } from '../../plaid-accounts/entities/plaid-account.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PlaidTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column({
    nullable: true,
    type: 'text',
  })
  isoCurrencyCode: string | null;

  @Column({
    unique: true,
  })
  transactionId: string;

  @Column()
  date: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  datetime: string | null;

  @Column()
  pending: boolean;

  @ApiProperty({
    enum: ['online', 'in store', 'other'],
  })
  @Column()
  paymentChannel: string; // https://plaid.com/docs/api/products/transactions/#transactions-sync-response-modified-payment-channel

  @Column({
    nullable: true,
    type: 'text',
  })
  categoryId: string | null;

  @Column({
    nullable: true,
    type: 'text',
  })
  merchantName: string | null;

  @ManyToOne(
    () => PlaidAccount,
    (plaidAccount) => plaidAccount.plaidTransactions,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  plaidAccount: PlaidAccount;
}
