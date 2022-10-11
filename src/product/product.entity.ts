import { Category } from 'src/category/category.entity';
import {
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  quantity: number;

  @Column({
    default: 0,
  })
  sold: number;

  @Column()
  imageUrl: string;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];
}
