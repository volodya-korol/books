import { EmailValidation } from 'src/common/validations/email.validation';
import { PasswordValidation } from 'src/common/validations/password.validation';

export class LoginDto {
  @EmailValidation()
  email: string;

  @PasswordValidation()
  password: string;
}
