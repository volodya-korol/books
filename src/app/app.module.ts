import { Module } from '@nestjs/common';
import { AuthModule } from 'src/models/auth/auth.module';
import { AuthorsModule } from 'src/models/authors/authors.module';
import { BooksModule } from 'src/models/books/books.module';
import { ProvidersModule } from './../providers/providers.module';
import { AppController } from './app.controller';

@Module({
  imports: [ProvidersModule, AuthModule, AuthorsModule, BooksModule],
  controllers: [AppController],
})
export class AppModule {}
