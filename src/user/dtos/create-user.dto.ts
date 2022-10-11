import { IsString } from 'class-validator';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  //   @Matches(regex) password has at least 1 char, 1 number, 1 symbol,...
  password: string;
}
