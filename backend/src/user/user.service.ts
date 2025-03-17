import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from './user.dto';
import * as validator from 'validator';
import { User } from './entities/user.entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @desc 새로운 사용자 생성
   * @param dto CreateUserDto (이메일)
   */
  async createUser(dto: CreateUserDto) {
    const { email } = dto;

    // 이메일 유효성 검사
    if (!validator.isEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    // 이메일 중복 검사
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    try {
      const user = this.userRepository.create(dto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  /**
   * @desc 이메일을 기반으로 사용자 조회
   * @param email 사용자 이메일
   */
  async findByEmail(email: string) {
    if (!validator.isEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * @desc 사용자의 유효성 검증 (ID 기반 로그인)
   * @param dto LoginUserDto (이메일)
   */
  async validateUser(dto: LoginUserDto) {
    const { email } = dto;

    if (!validator.isEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
