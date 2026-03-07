import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class GetClientResponseData {
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

  @ApiProperty()
  disableStrictUrlValidation: boolean;

  @ApiProperty({ type: [String] })
  redirectUrls: string[];

  @ApiProperty({ type: [String] })
  postLogoutRedirectUrls: string[];

  @ApiProperty()
  createdAt: string;
}

export class GetClientResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: GetClientResponseData })
  data: GetClientResponseData | null;
}
