import { Request } from 'express';
import { Author } from 'src/models/authors/entities/author.entity';

export interface RequestWithAuthor extends Request {
  user: Author;
}
