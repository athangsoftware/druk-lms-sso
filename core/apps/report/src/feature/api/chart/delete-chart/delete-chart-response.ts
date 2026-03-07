import { ApiProperty } from '@nestjs/swagger';

export class DeleteChartResponse {
  @ApiProperty() successMessage: string;
}
