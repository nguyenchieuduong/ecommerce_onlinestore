import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ActiveUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsBoolean()
  value: boolean;
}
