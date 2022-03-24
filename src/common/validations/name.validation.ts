import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

type OptionsT = {
  required?: boolean;
};

export function NameValidation(options: OptionsT = {}) {
  const { required = true } = options;
  return applyDecorators(
    IsString(),
    required ? IsNotEmpty() : IsOptional(),
    ApiProperty({ required, example: 'myName', description: "Author name" }),
  );
}
