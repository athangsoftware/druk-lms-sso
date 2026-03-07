import { ApiProperty } from '@nestjs/swagger';
import { DashboardData } from '../create-dashboard/create-dashboard-response';

export class GetDashboardListResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [DashboardData] }) data: DashboardData[];
  @ApiProperty() pageNumber: number;
  @ApiProperty() pageSize: number;
  @ApiProperty() totalCount: number;
}
