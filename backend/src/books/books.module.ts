import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

import { Book } from './book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),

    JwtModule.register({
      secret: 'mysecretkey',
    }),
  ],

  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
