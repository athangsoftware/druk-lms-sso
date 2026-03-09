import { ApiProperty } from '@nestjs/swagger';

export class UpdateIdentityProviderResponse {
  @ApiProperty()
  successMessage: string;
}
