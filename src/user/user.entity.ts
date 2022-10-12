import { Order } from 'src/order/order.entity';
import { Review } from 'src/review/review.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

const bcrypt = require('bcrypt');

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    default: true,
  })
  isAdmin: boolean;

  @Column({
    default: true,
  })
  isActived: boolean;

  @OneToOne(() => Order, (order) => order.user)
  order: Order;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 4);
  }
}
