import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

type OptionsT = {
  required?: boolean;
};

export function EmailValidation(options: OptionsT = {}) {
  const { required = true } = options;
  return applyDecorators(
    IsEmail(),
    required ? IsNotEmpty() : IsOptional(),
    ApiProperty({ required, example: 'example@gmail.com', description: "Unique author email" }),
  );
}
