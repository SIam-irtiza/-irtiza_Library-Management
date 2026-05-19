import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();

    const result: any[] = [];

    for (const user of users) {
      result.push({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      });
    }

    return result;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    if (user.role === 'admin') {
      return {
        message: 'Admin cannot be deleted',
      };
    }

    await this.userRepository.delete(id);

    return {
      message: 'User deleted successfully',
    };
  }
}