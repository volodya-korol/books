import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticSearchModule } from 'src/providers/database/elasticsearch/elasticsearch.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import BooksSearchService from './booksSearch.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), ElasticSearchModule],
  controllers: [BooksController],
  providers: [BooksService, BooksSearchService],
})
export class BooksModule {}
