import {
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  author?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}