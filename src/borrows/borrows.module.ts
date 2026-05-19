import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';

import { Borrow } from './borrow.entity';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Borrow,
      Book,
      User,
    ]),

    JwtModule.register({
      secret: 'mysecretkey',
    }),
  ],

  controllers: [BorrowsController],
  providers: [BorrowsService],
})
export class BorrowsModule {}