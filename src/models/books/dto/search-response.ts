import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../entities/book.entity';

class suggest {
  @ApiProperty({ example: 'boo' })
  text: string;
  @ApiProperty({ example: '<em>book</em>' })
  highlighted: string;
  @ApiProperty({ example: 0.76554855 })
  score: number;
}

export class SearchBooksDto {
  @ApiProperty({ isArray: true })
  result: Book;
  @ApiProperty()
  suggest: suggest;
}
