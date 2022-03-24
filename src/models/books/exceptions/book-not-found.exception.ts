import { NotFoundException } from '@nestjs/common';

export class BookNotFoundException extends NotFoundException {
  constructor(bookId: number) {
    super(`Post with id ${bookId} not found`);
  }
}