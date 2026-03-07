import { ApiProperty } from '@nestjs/swagger';
import { ChartType, FilterType } from '@app/prisma';

export class DashboardChartItem {
  @ApiProperty() dashboardChartId: string;
  @ApiProperty() chartId: string;
  @ApiProperty() chartName: string;
  @ApiProperty({ enum: ChartType }) chartType: ChartType;
  @ApiProperty() chartConfig: Record<string, unknown>;
  @ApiProperty() sqlQuery: string;
  @ApiProperty() connectionId: string;
  @ApiProperty() connectionName: string;
  @ApiProperty() positionX: number;
  @ApiProperty() positionY: number;
  @ApiProperty() width: number;
  @ApiProperty() height: number;
  @ApiProperty() order: number;
}

export class DashboardFilterItem {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ enum: FilterType }) filterType: FilterType;
  @ApiProperty() connectionId: string;
  @ApiProperty() targetColumn: string;
  @ApiProperty({ required: false }) sourceQuery?: string | null;
  @ApiProperty({ required: false }) defaultValue?: string | null;
  @ApiProperty() order: number;
}

export class DashboardDetailData {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ required: false }) description?: string | null;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date | null;
  @ApiProperty({ type: [DashboardChartItem] }) charts: DashboardChartItem[];
  @ApiProperty({ type: [DashboardFilterItem] }) filters: DashboardFilterItem[];
}

export class GetDashboardResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: DashboardDetailData }) data: DashboardDetailData;
}
