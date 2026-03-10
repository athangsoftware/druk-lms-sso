import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserExternalResponse {
  @ApiProperty()
  successMessage: string;
}
