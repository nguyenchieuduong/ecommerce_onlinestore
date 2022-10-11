import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { CurrentUser } from 'src/shared/decorators/current-user.decorators';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { ActiveUserDto } from './dtos/active-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { UserResponse } from './dtos/user-response.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  // Just for testing purpose
  @Get()
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() user) {
    console.log('this is from controller', user);
  }

  @Post('/signup')
  signup(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post('/signin')
  @Serialize(UserResponse)
  async signin(@Body() body: SignInDto) {
    const user = await this.userService.login(body);
    const token = this.userService.generateJwt(user);
    Object.assign(user, { token });
    return user;
  }

  @Post('/active')
  @UseGuards(AdminGuard)
  async setActiveUser(@Body() body: ActiveUserDto) {
    await this.userService.setActive(body);
    return 'Done';
  }

  @Post('/admin')
  @UseGuards(AdminGuard)
  async setAdminUser(@Body() body: ActiveUserDto) {
    await this.userService.setAdmin(body);
    return 'Done';
  }
}
