import { EmailValidation } from 'src/common/validations/email.validation';

export class SendConfirmCodeDto {
  @EmailValidation()
  email: string;
}
