import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user
   * @param email - The email of the new user
   * @returns The created user
   */
  async createUser(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required.');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('A user with this email already exists.');
    }

    const user = this.userRepository.create({ email });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(
        'Failed to create the user. Please try again.',
      );
    }
  }

  /**
   * Retrieves all users
   * @returns A list of all users
   */
  async findAll() {
    try {
      const users = await this.userRepository.find();
      if (users.length === 0) {
        throw new NotFoundException('No users found.');
      }
      return users;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve users.');
    }
  }

  /**
   * Logs in a user by email
   * @param email - The email of the user
   * @returns The logged-in user
   */
  async login(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required.');
    }

    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User with this email does not exist.');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(
        'Failed to log in the user. Please try again.',
      );
    }
  }
}
