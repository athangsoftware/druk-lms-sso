import { ApiProperty } from '@nestjs/swagger';
import { FilterType } from '@app/prisma';

export class DashboardFilterItem {
  @ApiProperty() id: string;
  @ApiProperty() dashboardId: string;
  @ApiProperty() name: string;
  @ApiProperty({ enum: FilterType }) filterType: FilterType;
  @ApiProperty({ required: false }) connectionId: string | null;
  @ApiProperty() targetColumn: string;
  @ApiProperty({ required: false }) sourceQuery: string | null;
  @ApiProperty({ required: false }) defaultValue: string | null;
  @ApiProperty() order: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty({ required: false }) updatedAt: Date | null;
}

export class GetDashboardFiltersResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [DashboardFilterItem] }) data: DashboardFilterItem[];
}
