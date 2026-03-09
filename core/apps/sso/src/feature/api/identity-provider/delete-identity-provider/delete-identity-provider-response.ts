import { ApiProperty } from '@nestjs/swagger';

export class DeleteIdentityProviderResponse {
  @ApiProperty()
  successMessage: string;
}
