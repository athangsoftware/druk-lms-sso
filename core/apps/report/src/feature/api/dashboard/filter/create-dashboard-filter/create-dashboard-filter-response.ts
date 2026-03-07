import { ApiProperty } from '@nestjs/swagger';
import { FilterType } from '@app/prisma';

export class DashboardFilterData {
  @ApiProperty() id: string;
  @ApiProperty() dashboardId: string;
  @ApiProperty() name: string;
  @ApiProperty({ enum: FilterType }) filterType: FilterType;
  @ApiProperty() connectionId: string;
  @ApiProperty() targetColumn: string;
  @ApiProperty({ required: false }) sourceQuery?: string | null;
  @ApiProperty({ required: false }) defaultValue?: string | null;
  @ApiProperty() order: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date | null;
}

export class CreateDashboardFilterResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: DashboardFilterData }) data: DashboardFilterData;
}
