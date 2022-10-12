import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { Pick } from './dtos/pick.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    private productService: ProductService,
  ) {}

  async create({ name, quantity }: Pick) {
    const product = await this.productService.findByName(name);
    const item = { product, quantity };
    return item;
  }
}
