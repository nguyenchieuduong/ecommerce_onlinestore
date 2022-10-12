import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { ItemController } from './item.controller';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
  imports: [ProductModule, TypeOrmModule.forFeature([Item])],
})
export class ItemModule {}
