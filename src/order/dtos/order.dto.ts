import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { Pick } from 'src/item/dtos/pick.dto';

export class OrderDto {
  @IsArray()
  @ArrayNotEmpty()
  picks: Pick[];
}
