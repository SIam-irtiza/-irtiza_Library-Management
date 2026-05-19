import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { BorrowsService } from './borrows.service';

import { BorrowDto } from './dto/borrow.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('borrows')
export class BorrowsController {
  constructor(
    private readonly borrowsService: BorrowsService,
  ) {}

  @UseGuards(JwtAuthGuard, new RolesGuard('member'))
  @Post()
  borrowBook(
    @Req() req: any,
    @Body() borrowDto: BorrowDto,
  ) {
    return this.borrowsService.borrowBook(
      req.user.id,
      borrowDto,
    );
  }

  @UseGuards(JwtAuthGuard, new RolesGuard('member'))
  @Get('my')
  myBorrows(@Req() req: any) {
    return this.borrowsService.myBorrows(
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  @Get()
  findAllBorrows() {
    return this.borrowsService.findAllBorrows();
  }
}