import { ApiProperty } from '@nestjs/swagger';

export class ExecuteChartQueryResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [String] }) columns: string[];
  @ApiProperty({ type: [Object] }) rows: Record<string, unknown>[];
  @ApiProperty() rowCount: number;
}
