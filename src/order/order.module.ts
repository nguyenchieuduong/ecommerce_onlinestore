import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from 'src/item/item.module';
import { ItemService } from 'src/item/item.service';
import { UserModule } from 'src/user/user.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [UserModule, ItemModule, TypeOrmModule.forFeature([Order])],
  exports: [OrderService],
})
export class OrderModule {}
