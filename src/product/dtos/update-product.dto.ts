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
  IsOptional,
} from 'class-validator';

interface Category {
  name: string;
}

export class UpdateProductDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imageUrl: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  categories: Category[];
}
