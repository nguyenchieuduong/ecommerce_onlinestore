import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { StripeModule } from './stripe/stripe.module';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';
import { ItemModule } from './item/item.module';
import { Order } from './order/order.entity';
import { Item } from './item/item.entity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/review.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Product, Category, Order, Item, Review],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    OrderModule,
    StripeModule,
    ItemModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
