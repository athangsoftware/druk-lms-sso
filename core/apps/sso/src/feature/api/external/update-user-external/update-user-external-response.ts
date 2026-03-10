import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserExternalResponse {
  @ApiProperty()
  successMessage: string;
}
