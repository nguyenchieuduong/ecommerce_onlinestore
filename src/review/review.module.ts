import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { ReviewController } from './review.controller';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    OrderModule,
    UserModule,
    ProductModule,
    TypeOrmModule.forFeature([Review]),
  ],
})
export class ReviewModule {}
