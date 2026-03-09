import { ApiProperty } from '@nestjs/swagger';

export class ToggleIdentityProviderResponse {
  @ApiProperty()
  successMessage: string;
}
