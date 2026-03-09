import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class GetIdentityProviderResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  clientId: string | null;

  @ApiPropertyOptional()
  authorizationUrl: string | null;

  @ApiPropertyOptional()
  tokenUrl: string | null;

  @ApiPropertyOptional()
  userInfoUrl: string | null;

  @ApiPropertyOptional()
  redirectUrl: string | null;

  @ApiPropertyOptional()
  scopes: string | null;

  @ApiPropertyOptional()
  iconUrl: string | null;

  @ApiProperty()
  isEnabled: boolean;

  @ApiProperty()
  displayOrder: number;

  @ApiPropertyOptional()
  metadata: any;

  @ApiProperty()
  hasClientSecret: boolean;

  @ApiProperty()
  createdAt: string;
}

export class GetIdentityProviderResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: GetIdentityProviderResponseData })
  data: GetIdentityProviderResponseData | null;
}
