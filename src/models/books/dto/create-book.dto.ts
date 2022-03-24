import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty({ required: false, description: 'Short description book' })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'eng', description: 'The language of your book' })
  language: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Your book (pdf)' })
  file: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  hashTags?: string[];
}
