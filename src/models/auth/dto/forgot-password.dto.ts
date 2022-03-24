import { PasswordValidation } from 'src/common/validations/password.validation';
import { ConfirmCodeDto } from './confirm-code.dto';

export class ForgotPasswordDto extends ConfirmCodeDto {
  @PasswordValidation()
  newPassword: string;
}
