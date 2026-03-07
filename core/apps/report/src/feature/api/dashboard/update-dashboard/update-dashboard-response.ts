import { ApiProperty } from '@nestjs/swagger';
import { DashboardData } from '../create-dashboard/create-dashboard-response';

export class UpdateDashboardResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: DashboardData }) data: DashboardData;
}
