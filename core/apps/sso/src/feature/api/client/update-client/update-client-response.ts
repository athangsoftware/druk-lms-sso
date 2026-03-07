import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientResponse {
  @ApiProperty()
  successMessage: string;
}
