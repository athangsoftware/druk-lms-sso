import { ApiProperty } from '@nestjs/swagger';
import { ChartData } from '../generate-chart/generate-chart-response';

export class GetChartResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: ChartData }) data: ChartData;
}
