import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateActionResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}

export class CreateActionResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: CreateActionResponseData })
  data: CreateActionResponseData | null;
}
