import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.items, { cascade: true })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  order: Order;
}
