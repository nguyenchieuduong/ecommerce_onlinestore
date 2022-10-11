import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  isNotEmptyObject,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

interface Category {
  name: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsArray()
  @ArrayNotEmpty()
  categories: Category[];
}
