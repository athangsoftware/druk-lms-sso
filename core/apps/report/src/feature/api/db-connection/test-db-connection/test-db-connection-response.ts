import { ApiProperty } from '@nestjs/swagger';

export class TestDbConnectionResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty() data: { isConnected: boolean };
}
