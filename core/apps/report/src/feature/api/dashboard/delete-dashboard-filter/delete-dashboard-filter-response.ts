import { ApiProperty } from '@nestjs/swagger';

export class DeleteDashboardFilterResponse {
  @ApiProperty() successMessage: string;
}
