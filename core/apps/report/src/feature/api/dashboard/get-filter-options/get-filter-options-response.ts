import { ApiProperty } from '@nestjs/swagger';

export class GetFilterOptionsResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [String] }) options: string[];
}
