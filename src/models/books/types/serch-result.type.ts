import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../entities/book.entity";

export class SearchResult {
  result: [Book];
  @ApiProperty()
  suggest: {
    text: 'boo';
    highlighted: '<em>book</em>';
    score: 0.7566221;
  };
}
