import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateClientResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  clientId: string;

  @ApiPropertyOptional()
  clientSecret: string | null;

  @ApiProperty()
  clientType: string;
}

export class CreateClientResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: CreateClientResponseData })
  data: CreateClientResponseData | null;
}
