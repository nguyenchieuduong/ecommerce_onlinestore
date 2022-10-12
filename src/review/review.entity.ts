import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn()
  user: User;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({
    default: false,
  })
  isDelivery: boolean;

  @Column({
    default: true,
  })
  isPaid: boolean;
}
