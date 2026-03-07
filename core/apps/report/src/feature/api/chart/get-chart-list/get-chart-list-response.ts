import { ApiProperty } from '@nestjs/swagger';
import { ChartData } from '../generate-chart/generate-chart-response';

export class GetChartListResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [ChartData] }) data: ChartData[];
  @ApiProperty() pageNumber: number;
  @ApiProperty() pageSize: number;
  @ApiProperty() totalCount: number;
  @ApiProperty() orderByPropertyName: string;
  @ApiProperty() sortingDirection: string;
}
