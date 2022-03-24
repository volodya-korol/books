import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class FindAndCountAuthorsDto {
  @ApiProperty({example: 1})
  count: number;
  @ApiProperty()
  data: Author;
}
