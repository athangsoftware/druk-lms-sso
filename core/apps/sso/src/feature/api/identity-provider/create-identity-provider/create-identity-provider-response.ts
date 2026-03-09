import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateIdentityProviderResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  isEnabled: boolean;
}

export class CreateIdentityProviderResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: CreateIdentityProviderResponseData })
  data: CreateIdentityProviderResponseData | null;
}
