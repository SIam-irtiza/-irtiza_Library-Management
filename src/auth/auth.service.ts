import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from '../users/user.entity';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { fullName, email, password, role } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    await this.userRepository.save(user);

    const { password: userPassword, ...userData } = user;

return {
  message: 'User registered successfully',
  user: userData,
};
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

   const { password: userPassword, ...userData } = user;

return {
  message: 'Login successful',
  access_token,
  user: userData,
};
  }
}