import { Item } from 'src/item/item.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User, (user) => user.order)
  @JoinColumn()
  user: User;

  @OneToMany(() => Item, (item) => item.order, { cascade: true })
  @JoinTable()
  items: Item[];

  @Column()
  amount: number;
}
