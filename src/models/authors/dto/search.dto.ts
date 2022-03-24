import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SearchParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: false, description: 'Offset authors (one offset = offset * limit)',default: 0})
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: false, description: 'Max count authorst in respone', default: 5 })
  limit?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Author name that you want to found'})
  search?: string;
}
