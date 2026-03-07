import { ApiProperty } from '@nestjs/swagger';

export class DashboardData {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ required: false }) description?: string | null;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date | null;
}

export class CreateDashboardResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: DashboardData }) data: DashboardData;
}
