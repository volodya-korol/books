import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Author } from '../authors/entities/author.entity';
import BooksSearchService from './booksSearch.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { BookNotFoundException } from './exceptions/book-not-found.exception';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private booksSearchService: BooksSearchService,
  ) {}

  getBooks(authorId: number) {
    return this.bookRepository.findAndCount({ author: authorId });
  }

  async getById(bookId: number) {
    const book = await this.bookRepository.findOne(bookId);
    if (!book) throw new BookNotFoundException(bookId);
    return book;
  }

  async find(text: string) {
    const { result, suggest } =
      text[0] === '#'
        ? await this.booksSearchService.searchHashTags(text)
        : await this.booksSearchService.searchBooks(text);
    const ids = result.map((result) => result.id);
    const books = await this.bookRepository.find({
      where: { id: In(ids) },
    });
    return { result: books, suggest };
  }

  async create(createBookDto: CreateBookDto, author: Author) {
    const newBook = this.bookRepository.create({ ...createBookDto, author: author.id });
    await this.bookRepository.save(newBook);
    this.booksSearchService.indexBook(newBook);
    return newBook;
  }

  async setCover(bookId: number, imageId: string, user: Author) {
    const book = await this.bookRepository.findOne({ author: user.id, id: bookId });
    if (!book) throw new BookNotFoundException(bookId);
    const newBook = { ...book, cover: imageId };
    await this.bookRepository.save(newBook);
    return newBook;
  }

  async delete(bookId: number) {
    const deleteResponse = await this.bookRepository.delete({ id: bookId });
    if (!deleteResponse.affected) {
      throw new BookNotFoundException(bookId);
    }
    this.booksSearchService.delete(bookId);
  }
}
