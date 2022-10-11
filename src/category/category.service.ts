import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  createCategory({ name }: CreateCategoryDto) {
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async remove(id) {
    const category = await this.categoryRepository.find({ where: { id } });
    if (!category)
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    return this.categoryRepository.remove(category);
  }
}
