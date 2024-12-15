import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(email: string) {
    const user = this.userRepository.create({ email });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async login(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('User not found');
    }
    // if (user.password !== password) {
    //     throw new Error('Password not matched');
    // }
    return user;
  }
}
