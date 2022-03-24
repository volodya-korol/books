import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';
import { EmailValidation } from 'src/common/validations/email.validation';

export class ConfirmCodeDto {
  @EmailValidation()
  email: string;

  @IsNumberString()
  @Length(0, 6)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 6, description: 'six-digit number',example: "256894" })
  code: string;
}
