import { ApiProperty } from '@nestjs/swagger';

export class DeleteResourceResponse {
  @ApiProperty()
  successMessage: string;
}
