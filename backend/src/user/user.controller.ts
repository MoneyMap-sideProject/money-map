import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body('email') email: string) {
    return this.userService.createUser(email);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('login')
  async login(@Body('email') email: string) {
    return this.userService.login(email);
  }
}
