import { ApiProperty } from '@nestjs/swagger';
import { ChartType } from '@app/prisma';

export class ChartData {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() connectionId: string;
  @ApiProperty() connectionName: string;
  @ApiProperty() sqlQuery: string;
  @ApiProperty({ enum: ChartType }) chartType: ChartType;
  @ApiProperty() chartConfig: Record<string, unknown>;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date | null;
}

export class GenerateChartResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: ChartData }) data: ChartData;
}
