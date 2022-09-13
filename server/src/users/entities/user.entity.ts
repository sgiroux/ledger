import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Item } from '../../items/entities/item.entity';
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

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @OneToMany(() => Rule, (rule) => rule.user)
  rules: Rule[];
}
