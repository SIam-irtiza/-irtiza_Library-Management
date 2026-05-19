import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Book } from './book.entity';

import { CreateBookDto } from './dto/book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);

    await this.bookRepository.save(book);

    return {
      message: 'Book added successfully',
      book,
    };
  }

  async findAll() {
    const books = await this.bookRepository.find();

    return books;
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ) {
    await this.bookRepository.update(id, updateBookDto);

    return {
      message: 'Book updated successfully',
    };
  }

  async remove(id: number) {
    await this.bookRepository.delete(id);

    return {
      message: 'Book deleted successfully',
    };
  }
}