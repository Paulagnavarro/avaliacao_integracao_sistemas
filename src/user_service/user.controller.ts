import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { name: string; lastName: string; email: string; password: string }) {
    const user = await this.userService.createUser(body);
    return { message: 'ok', user };
  }

  @Get()
  async getUser(@Query('email') email: string) {
    return await this.userService.getUserByEmail(email);
  }
}
