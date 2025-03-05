import {
  Controller,
  Post,
  Get,
  Body,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Session as ExpressSession, SessionData } from 'express-session';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Session() session: SessionData) {
    const user = await this.userService.validateUser(dto);
    session.user = { id: user.id, email: user.email };
    return { message: 'Login successful' };
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

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Session() session: SessionData) {
    return { user: session.user };
  }
}
