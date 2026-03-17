import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UpdateResourceResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}

export class UpdateResourceResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: UpdateResourceResponseData })
  data: UpdateResourceResponseData | null;
}
