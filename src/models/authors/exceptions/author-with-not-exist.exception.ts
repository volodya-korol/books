import { NotFoundException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@ApiResponse({ status: 425, description: 'helloooooooooooooooooooooooooooooooooooooooooooo' })
export class AuthorNotFoundException extends NotFoundException {
  constructor(notFound: string) {
    super(`Author with this ${notFound} not exist`);
  }
}
