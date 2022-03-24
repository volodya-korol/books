import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileNameToIdPipe } from 'src/common/pipes/fileNameToId.pipe';
import { RequestWithAuthor } from 'src/common/types/requestWithAuthor';
import { multerImageOptions } from 'src/config/fileUploading/multerOptions';
import { FindAndCountAuthorsDto } from 'src/models/authors/dto/findAndCountResponse';
import { AuthorsService } from './authors.service';
import { SearchParams } from './dto/search.dto';
import { UpdateAuthorDto } from './dto/update-author-dto.dto';
import { Author } from './entities/author.entity';
import { Follower } from './entities/folower.entity';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  //*  Author
  @Get()
  @ApiOperation({ summary: 'Get authors' })
  @ApiOkResponse({ type: FindAndCountAuthorsDto })
  getAuthors(@Query() { search = '', offset = 0, limit = 5 }: SearchParams) {
    return this.authorsService.getAuthors(search, offset, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author' })
  @ApiOkResponse({ type: Author })
  getOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.authorsService.getOne(id);
  }

  @Get('avatar/:avatarId')
  @ApiOperation({ summary: 'Get avatar' })
  @ApiOkResponse()
  getAvatar(@Res() res: Response, @Param('avatarId') avatarId: string) {
    res.sendFile(`${avatarId}.jpg`, { root: 'uploads' });
  }

  @Put()
  @AuthGuard()
  @ApiOperation({ summary: 'Update author' })
  @ApiOkResponse({ type: Author })
  updateAuthor(@Req() request: RequestWithAuthor, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(request.user.id, updateAuthorDto);
  }

  @Put('/avatar')
  @AuthGuard()
  @ApiOperation({ summary: 'Update avatar' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
        },
      },
    },
  })
  @ApiOkResponse({ type: Author })
  @UseInterceptors(FileInterceptor('image', multerImageOptions))
  updateAvatar(@Req() request: RequestWithAuthor, @UploadedFile(FileNameToIdPipe) image: Express.Multer.File) {
    return this.authorsService.updateAvatar(request.user.id, image.filename);
  }

  @Delete()
  @AuthGuard()
  @ApiOperation({ summary: 'Delete author' })
  @ApiOkResponse()
  remove(@Req() request: RequestWithAuthor) {
    return this.authorsService.remove(request.user.id);
  }

  //* ================
  //* Folowers

  @Get('followers/:id')
  @ApiOperation({ summary: 'Folowers' })
  @ApiOkResponse({ type: [Author] })
  getFollowers(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.getFollowers(id);
  }

  @Get('followings/:id')
  @ApiOperation({ summary: 'Folowings' })
  @ApiOkResponse({ type: [Author] })
  getFollowing(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.getFollowing(id);
  }

  @Post('follow/:followingId')
  @AuthGuard()
  @HttpCode(200)
  @ApiOperation({ summary: 'Follow' })
  @ApiOkResponse({ type: Follower })
  follow(@Param('followingId', ParseIntPipe) followingId: number, @Req() request: RequestWithAuthor) {
    return this.authorsService.follow(request.user.id, followingId);
  }

  @Post('unFollow:followingId')
  @AuthGuard()
  @HttpCode(200)
  @ApiOperation({ summary: 'Unfollow' })
  @ApiOkResponse()
  unFollow(@Param('followingId', ParseIntPipe) followingId: number, @Req() request: RequestWithAuthor) {
    return this.authorsService.unFollow(request.user.id, followingId);
  }
}
