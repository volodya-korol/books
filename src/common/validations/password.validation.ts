import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export function PasswordValidation() {
  return applyDecorators(
    IsNotEmpty(),
    Length(6, 28),
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, {
      message:
        'A password needs to have at least one uppercase letter, one lowercase letter, one special character and one number.',
    }),
    ApiProperty({
      example: '12345@Qwerty',
      minLength: 6,
      maxLength: 28,
      description:
        'A password needs to have at least one uppercase letter, one lowercase letter, one special character and one number.',
    }),
  );
}
