import {
  Controller,
  Post,
  Get,
  Body,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Session as ExpressSession, SessionData } from 'express-session';

@ApiTags('Users') // Swagger UI에서 "Users" 그룹으로 표시
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: '사용자 등록',
    description: '새로운 사용자를 등록한다.',
  })
  @ApiResponse({ status: 201, description: '사용자 등록 성공' })
  @ApiResponse({ status: 400, description: '입력값이 유효하지 않음' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인한다.',
  })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '이메일 또는 비밀번호가 잘못됨' })
  @ApiBody({ type: LoginUserDto })
  async login(@Body() dto: LoginUserDto, @Session() session: SessionData) {
    const user = await this.userService.validateUser(dto);
    session.user = { id: user.id, email: user.email };
    return { message: 'Login successful' };
  }

  @Get('logout')
  @ApiOperation({
    summary: '로그아웃',
    description: '현재 로그인한 사용자를 로그아웃한다.',
  })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
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
  @ApiOperation({
    summary: '프로필 조회',
    description: '현재 로그인한 사용자의 프로필 정보를 가져온다.',
  })
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  @ApiResponse({ status: 401, description: '로그인이 필요함' })
  profile(@Session() session: SessionData) {
    return { user: session.user };
  }
}
