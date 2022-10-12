import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { compareSync } from 'bcrypt';
import { SECRET_KEY } from 'src/constants/jwt';
const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser({ username, password }) {
    const existedUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existedUser)
      throw new HttpException('user existed', HttpStatus.BAD_REQUEST);
    const user = this.userRepository.create({ username, password });
    return this.userRepository.save(user);
  }

  async login({ username, password }) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user || !compareSync(password, user.password))
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return user;
  }

  generateJwt({ username, isActived, isAdmin }) {
    return jwt.sign({ username, isActived, isAdmin }, SECRET_KEY);
  }

  async setActive({ username, value }) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    user.isActived = value;
    return this.userRepository.save(user);
  }

  async setAdmin({ username, value }) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    user.isAdmin = value;
    return this.userRepository.save(user);
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
