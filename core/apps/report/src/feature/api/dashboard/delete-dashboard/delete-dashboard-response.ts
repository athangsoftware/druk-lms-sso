import { ApiProperty } from '@nestjs/swagger';

export class DeleteDashboardResponse {
  @ApiProperty() successMessage: string;
}
