import { ApiProperty } from '@nestjs/swagger';
import { DashboardChartData } from '../add-chart-to-dashboard/add-chart-to-dashboard-response';

export class UpdateChartLayoutResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: DashboardChartData }) data: DashboardChartData;
}
