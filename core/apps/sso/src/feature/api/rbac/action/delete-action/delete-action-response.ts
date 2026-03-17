import { ApiProperty } from '@nestjs/swagger';

export class DeleteActionResponse {
  @ApiProperty()
  successMessage: string;
}
