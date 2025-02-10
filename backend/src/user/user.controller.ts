import {
  Controller,
  Post,
  Get,
  Body,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { Session as ExpressSession } from 'express-session';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Session() session: ExpressSession, // NestJS에서 세션을 DI로 주입
  ) {
    const user = await this.userService.login(email);
    if (user) {
      session.user = { email: user.email }; // 세션에 사용자 정보 저장
      return { message: 'Login successful' };
    } else {
      return { statusCode: 401, message: 'Invalid credentials' };
    }
  }

  @Get('logout')
  async logout(@Session() session: ExpressSession) {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) {
          reject({ statusCode: 500, message: 'Logout failed' });
        }
        resolve({ message: 'Logout successful' });
      });
    });
  }

  @Get('status')
  status(@Session() session: ExpressSession) {
    if (session.user) {
      return { loggedIn: true, user: session.user };
    }
    return { loggedIn: false };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('create')
  async createUser(@Body('email') email: string) {
    return this.userService.createUser(email);
  }
}
