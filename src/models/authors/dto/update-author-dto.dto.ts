import { ApiProperty } from '@nestjs/swagger';
import { NameValidation } from 'src/common/validations/name.validation';

export class UpdateAuthorDto {
  @NameValidation({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  description?: string;
}
