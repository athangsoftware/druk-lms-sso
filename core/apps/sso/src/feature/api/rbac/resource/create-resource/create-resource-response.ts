import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateResourceResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}

export class CreateResourceResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: CreateResourceResponseData })
  data: CreateResourceResponseData | null;
}
