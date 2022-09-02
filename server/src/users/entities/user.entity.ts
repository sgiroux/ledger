import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PlaidItem } from '../../plaid-items/entities/plaid-item.entity';
import { Rule } from '../../rules/entities/rule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => PlaidItem, (plaidItem) => plaidItem.user)
  plaidItems: PlaidItem[];

  @OneToMany(() => Rule, (rule) => rule.user)
  rules: Rule[];
}
