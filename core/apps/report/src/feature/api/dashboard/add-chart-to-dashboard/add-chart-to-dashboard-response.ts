import { ApiProperty } from '@nestjs/swagger';

export class DashboardChartData {
  @ApiProperty() id: string;
  @ApiProperty() dashboardId: string;
  @ApiProperty() chartId: string;
  @ApiProperty() positionX: number;
  @ApiProperty() positionY: number;
  @ApiProperty() width: number;
  @ApiProperty() height: number;
  @ApiProperty() order: number;
}

export class AddChartToDashboardResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: DashboardChartData }) data: DashboardChartData;
}
