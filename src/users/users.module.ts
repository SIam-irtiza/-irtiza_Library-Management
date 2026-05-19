import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: 'mysecretkey',
    }),
  ],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}