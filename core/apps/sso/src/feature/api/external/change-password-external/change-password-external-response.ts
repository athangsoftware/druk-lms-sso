import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordExternalResponse {
  @ApiProperty()
  successMessage: string;
}
