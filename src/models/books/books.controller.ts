import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileNameToIdPipe } from 'src/common/pipes/fileNameToId.pipe';
import { RequestWithAuthor } from 'src/common/types/requestWithAuthor';
import { multerBookOptions, multerImageOptions } from 'src/config/fileUploading/multerOptions';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchBooksDto } from './dto/search-response';
import { Book } from './entities/book.entity';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('author/:authorId')
  @ApiOperation({ summary: 'Get author books' })
  @ApiOkResponse({ type: [Book] })
  getBooks(@Param('authorId', ParseIntPipe) authorId: number) {
    return this.booksService.getBooks(authorId);
  }

  @Get('find/:text')
  @ApiOperation({ summary: 'Find books' })
  @ApiOkResponse({
    type: SearchBooksDto,
  })
  find(@Param('text') text: string) {
    return this.booksService.find(text);
  }

  @Post('save')
  @AuthGuard()
  @UseInterceptors(FileInterceptor('file', multerBookOptions))
  @ApiOperation({ summary: 'Create book' })
  @ApiOkResponse({ type: Book })
  create(
    @Req() request: RequestWithAuthor,
    @Body() createBookDto: CreateBookDto,
    @UploadedFile(FileNameToIdPipe) file: Express.Multer.File,
  ) {
    return this.booksService.create(
      { ...createBookDto, file: file.filename },
      request.user,
    );
  }

  @Post('cover/:bookId')
  @AuthGuard()
  @UseInterceptors(FileInterceptor('cover', multerImageOptions))
  @ApiOperation({ summary: 'Create book cover' })
  @ApiOkResponse({ type: Book })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cover: {
          type: 'string',
        },
      },
    },
  })
  setCover(
    @Param('bookId', ParseIntPipe) bookId: number,
    @UploadedFile(FileNameToIdPipe) cover: Express.Multer.File,
    @Req() request: RequestWithAuthor,
  ) {
    return this.booksService.setCover(bookId, cover.filename, request.user);
  }
}
