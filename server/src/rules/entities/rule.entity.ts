import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
@Unique(['name', 'user'])
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    enum: ['name', 'transactionId', 'paymentChannel'],
  })
  field: 'name' | 'transactionId' | 'paymentChannel';

  @Column({
    enum: ['contains', 'equals'],
  })
  operation: 'contains' | 'equals';

  @Column()
  criteria: string;

  @Column()
  isEnabled: boolean;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.plaidItems, {
    nullable: false,
  })
  user: User;
}
