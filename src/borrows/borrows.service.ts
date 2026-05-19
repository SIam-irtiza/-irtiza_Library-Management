import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Borrow } from './borrow.entity';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

import { BorrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async borrowBook(
    userId: number,
    borrowDto: BorrowDto,
  ) {
    const { bookId } = borrowDto;

    const book = await this.bookRepository.findOne({
      where: { id: bookId },
    });

    if (!book) {
      return {
        message: 'Book not found',
      };
    }

    if (book.quantity <= 0) {
      return {
        message: 'Book not available',
      };
    }

    book.quantity -= 1;

    await this.bookRepository.save(book);

    const borrow = this.borrowRepository.create({
      userId,
      bookId,
      borrowDate: new Date().toISOString(),
      quantity: 1,
    });

    await this.borrowRepository.save(borrow);

    return {
      message: 'Book borrowed successfully',
      borrow,
    };
  }

  async myBorrows(userId: number) {
    const borrows = await this.borrowRepository.find({
      where: {
        userId,
      },
    });

    const result: any[] = [];

    for (const borrow of borrows) {
      const book = await this.bookRepository.findOne({
        where: { id: borrow.bookId },
      });

      result.push({
        bookId: borrow.bookId,
        bookName: book?.title,
        quantity: borrow.quantity,
        borrowDate: borrow.borrowDate,
      });
    }

    return result;
  }

  async findAllBorrows() {
    const borrows = await this.borrowRepository.find();

    const result: any[] = [];

    for (const borrow of borrows) {
      const book = await this.bookRepository.findOne({
        where: { id: borrow.bookId },
      });

      const user = await this.userRepository.findOne({
        where: { id: borrow.userId },
      });

      result.push({
        borrowId: borrow.id,
        memberId: borrow.userId,
        memberName: user?.fullName,
        bookId: borrow.bookId,
        bookName: book?.title,
        quantity: borrow.quantity,
        borrowDate: borrow.borrowDate,
      });
    }

    return result;
  }

  async returnBook(id: number) {
    const borrow = await this.borrowRepository.findOne({
      where: { id },
    });

    if (!borrow) {
      return {
        message: 'Borrow record not found',
      };
    }

    const book = await this.bookRepository.findOne({
      where: { id: borrow.bookId },
    });

    if (book) {
      book.quantity += borrow.quantity;

      await this.bookRepository.save(book);
    }

    await this.borrowRepository.delete(id);

    return {
      message: 'Book returned successfully',
    };
  }
}