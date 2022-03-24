import { EmailValidation } from 'src/common/validations/email.validation';
import { NameValidation } from 'src/common/validations/name.validation';
import { PasswordValidation } from 'src/common/validations/password.validation';

export class CreateAuthorDto {
  @NameValidation()
  name: string;
  @EmailValidation()
  email: string;
  @PasswordValidation()
  password: string;
}
