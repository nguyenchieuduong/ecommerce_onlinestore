import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
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

  @Post('/signup')
  @ApiOperation({ summary: 'Register account' })
  @ApiTags('Authentication')
  @ApiResponse({
    status: 200,
    description: 'Successfully Register',
    schema: {
      properties: {
        id: {
          type: 'uuid',
          example: 'b3d854d0-c431-415c-aa9a-30ca740113dc',
        },
        username: {
          type: 'string',
          example: 'DuongNC1',
        },
        token: {
          type: 'string',
          example:
            'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhvYW5nTlYxMjUiLCJpc0FjdGl2ZWQiOnRydWUsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NTU4Mzc3OX0.OP-CrWMyfn7UPOzUQztWHolh4fLIM62cGoMRggA-0NE',
          description: 'This is JWT, it helps to authorize',
        },
        isAdmin: {
          type: 'boolean',
          example: true,
          description: 'Currently, this property is set equal true by default',
        },
        isActived: {
          type: 'boolean',
          example: true,
          description: 'Currently, this property is set equal true by default',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Existed an user with this username',
    schema: {
      properties: {
        statusCode: {
          type: 'integer',
          example: 400,
          description: 'Status code',
        },
        message: {
          type: 'string',
          example: 'user existed',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Username/password too short',
    schema: {
      properties: {
        statusCode: {
          type: 'integer',
          example: 400,
          description: 'Status code',
        },
        message: {
          type: 'Array',
          example: ['password must be longer than or equal to 6 characters'],
        },
        error: {
          type: 'string',
          example: 'Bad Request',
          description: 'Description Status Code',
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'DuongNC1',
          description: 'username contains at least 6 character',
        },
        password: {
          type: 'string',
          example: 'onlinestore',
          description: 'password contains at least 6 character',
        },
      },
    },
  })
  @Serialize(UserResponse)
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    const token = 'Token ' + this.userService.generateJwt(user);
    Object.assign(user, { token });
    return user;
  }

  @Post('/signin')
  @ApiTags('Authentication')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 400,
    description: 'Wrong username/password',
    schema: {
      properties: {
        statusCode: {
          type: 'integer',
          example: 400,
          description: 'Status code',
        },
        message: {
          type: 'string',
          example: 'user not found',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully Login',
    schema: {
      properties: {
        id: {
          type: 'uuid',
          example: 'b3d854d0-c431-415c-aa9a-30ca740113dc',
        },
        username: {
          type: 'string',
          example: 'DuongNC1',
        },
        token: {
          type: 'string',
          example:
            'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhvYW5nTlYxMjUiLCJpc0FjdGl2ZWQiOnRydWUsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NTU4Mzc3OX0.OP-CrWMyfn7UPOzUQztWHolh4fLIM62cGoMRggA-0NE',
          description: 'This is JWT, it helps to authorize',
        },
        isAdmin: {
          type: 'boolean',
          example: true,
          description: 'Currently, this property is set equal true by default',
        },
        isActived: {
          type: 'boolean',
          example: true,
          description: 'Currently, this property is set equal true by default',
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'DuongNC1',
          description: 'username contains at least 6 character',
        },
        password: {
          type: 'string',
          example: 'onlinestore',
          description: 'password contains at least 6 character',
        },
      },
    },
  })
  @Serialize(UserResponse)
  async signin(@Body() body: SignInDto) {
    const user = await this.userService.login(body);
    const token = this.userService.generateJwt(user);
    Object.assign(user, { token });
    return user;
  }

  @Post('/active')
  @ApiTags('Adminstrator')
  @ApiOperation({ summary: '** Active/Deactive user' })
  @ApiResponse({
    status: 400,
    description: 'Not found this username',
    schema: {
      properties: {
        statusCode: {
          type: 'integer',
          example: 400,
          description: 'Status code',
        },
        message: {
          type: 'string',
          example: 'user not found',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully active/deactive this user',
  })
  @ApiResponse({
    status: 403,
    description: 'Not authorized yet',
    schema: {
      properties: {
        statusCode: {
          type: 'integer',
          example: 403,
          description: 'Status code',
        },
        message: {
          type: 'string',
          example: 'Forbidden resource',
        },
        error: {
          type: 'string',
          example: 'Forbidden',
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'DuongNC1',
          description: 'username of user that admin wanna active/deactive',
        },
        value: {
          type: 'boolean',
          example: true,
          description: 'set value of isActived property',
        },
      },
    },
  })
  @UseGuards(AdminGuard)
  async setActiveUser(@Body() body: ActiveUserDto) {
    await this.userService.setActive(body);
    return 'Done';
  }

  @Post('/admin')
  @ApiTags('Adminstrator')
  @ApiOperation({ summary: '** Set role admin' })
  @ApiResponse({
    status: 400,
    description: 'Not found this username',
    schema: {
      properties: {
        statusCode: {
          type: 'integer',
          example: 400,
          description: 'Status code',
        },
        message: {
          type: 'string',
          example: 'user not found',
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Not authorized yet',
    schema: {
      properties: {
        statusCode: {
          type: 'integer',
          example: 403,
          description: 'Status code',
        },
        message: {
          type: 'string',
          example: 'Forbidden resource',
        },
        error: {
          type: 'string',
          example: 'Forbidden',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully set role for this user',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'DuongNC1',
          description: 'username of user that admin wanna set role',
        },
        value: {
          type: 'boolean',
          example: true,
          description: 'set value of isAdmin property',
        },
      },
    },
  })
  @UseGuards(AdminGuard)
  async setAdminUser(@Body() body: ActiveUserDto) {
    await this.userService.setAdmin(body);
    return 'Done';
  }
}
