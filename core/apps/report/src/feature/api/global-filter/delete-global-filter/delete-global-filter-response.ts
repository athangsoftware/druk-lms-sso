import { ApiProperty } from '@nestjs/swagger';

export class DeleteGlobalFilterResponse {
  @ApiProperty() successMessage: string;
}
