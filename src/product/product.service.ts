import { Body, Injectable, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';
import { Item } from 'src/item/item.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './product.entity';

const slugify = require('slugify');

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private categoryService: CategoryService,
  ) {}

  async createProduct({
    name,
    price,
    description,
    quantity,
    imageUrl,
    categories,
  }: CreateProductDto) {
    // missing logic update image to cloudinary
    try {
      const existedProduct = await this.productRepository.findOne({
        where: { name },
      });
      console.log(existedProduct);

      if (existedProduct)
        throw new HttpException(
          'existed an product with this name',
          HttpStatus.BAD_REQUEST,
        );
      const slug = slugify(name, {
        replacement: '-',
        lower: true,
        trim: true,
      });
      const categoriesArr = await Promise.all(
        categories.map(({ name }) =>
          this.categoryRepository.findOne({ where: { name } }),
        ),
      );
      const product = this.productRepository.create({
        name,
        price,
        description,
        quantity,
        imageUrl,
        categories: categoriesArr,
        slug,
      });
      return this.productRepository.save(product);
    } catch (error) {
      throw new HttpException(
        'existed product has same name',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findBySlug(slug: string) {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['categories'],
    });
    if (!product) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return product;
  }

  async findByName(name: string) {
    const product = await this.productRepository.findOne({
      where: { name },
      relations: ['categories'],
    });
    if (!product) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return product;
  }

  getAll(from: number, to: number) {
    if (from !== undefined && to !== undefined && from < to) {
      return this.productRepository.find({
        relations: ['categories'],
        take: to - from,
        skip: from,
      });
    } else {
      return this.productRepository.find({ relations: ['categories'] });
    }
  }

  async updateBySlug(attrs: Partial<UpdateProductDto>, slug: string) {
    const product = await this.productRepository.findOne({ where: { slug } });
    if (!product) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (attrs.categories && attrs.categories.length) {
      attrs.categories = await Promise.all(
        attrs.categories.map(({ name }) =>
          this.categoryRepository.findOne({
            where: { name },
            relations: ['categories'],
          }),
        ),
      );
    }
    Object.assign(product, attrs);
    return this.productRepository.save(product);
  }

  async removeBySlug(slug: string) {
    const product = await this.productRepository.findOne({ where: { slug } });
    if (!product) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return this.productRepository.remove(product);
  }

  async findByCategory(category: string, from: number, to: number) {
    return this.categoryService.findProductsByCategory(category, from, to);
  }

  updateQuantityAndSold(product: Product, item: Item) {
    product.quantity = product.quantity - item.quantity;
    product.sold = product.sold + item.quantity;
    return this.productRepository.save(product);
  }
}
