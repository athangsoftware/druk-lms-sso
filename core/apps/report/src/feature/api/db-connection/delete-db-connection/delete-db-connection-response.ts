import { ApiProperty } from '@nestjs/swagger';

export class DeleteDbConnectionResponse {
  @ApiProperty() successMessage: string;
}
