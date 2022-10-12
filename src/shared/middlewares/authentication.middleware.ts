import { NestMiddleware, Request, Response } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SECRET_KEY } from 'src/constants/jwt';
const jwt = require('jsonwebtoken');

export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  use(req: any, res: any, next: (error?: any) => void) {
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload;
      } catch (error) {
        req.user = null;
      }
    } else {
      req.user = null;
    }
    next();
  }
}
