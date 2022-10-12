import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  token: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  isActived: boolean;
}
