import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ enum: ['name', 'transactionId', 'paymentChannel'] })
  @Column({
    enum: ['name', 'transactionId', 'paymentChannel'],
  })
  field: 'name' | 'transactionId' | 'paymentChannel';

  @ApiProperty({ enum: ['contains', 'equals'] })
  @Column({
    enum: ['contains', 'equals'],
  })
  operation: 'contains' | 'equals';

  @Column()
  criteria: string;

  @Column()
  isEnabled: boolean;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.items, {
    nullable: false,
  })
  user: User;
}
