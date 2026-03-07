import { ApiProperty } from '@nestjs/swagger';

export class DeleteClientResponse {
  @ApiProperty()
  successMessage: string;
}
