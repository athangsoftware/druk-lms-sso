import { ApiProperty } from '@nestjs/swagger';

export class RemoveChartFromDashboardResponse {
  @ApiProperty() successMessage: string;
}
