import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UpdateActionResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}

export class UpdateActionResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: UpdateActionResponseData })
  data: UpdateActionResponseData | null;
}
