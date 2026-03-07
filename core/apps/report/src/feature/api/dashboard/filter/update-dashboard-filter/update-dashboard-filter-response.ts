import { ApiProperty } from '@nestjs/swagger';

export class UpdateDashboardFilterResponse {
  @ApiProperty() successMessage: string;
}
