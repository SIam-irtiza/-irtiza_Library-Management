import {
  IsNumber,
} from 'class-validator';

export class BorrowDto {
  @IsNumber()
  bookId!: number;
}