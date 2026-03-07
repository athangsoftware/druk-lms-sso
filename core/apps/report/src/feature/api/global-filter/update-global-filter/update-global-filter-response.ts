import { ApiProperty } from '@nestjs/swagger';

export class UpdateGlobalFilterResponse {
  @ApiProperty() successMessage: string;
}
