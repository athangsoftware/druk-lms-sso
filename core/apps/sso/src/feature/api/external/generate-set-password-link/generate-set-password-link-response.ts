import { ApiProperty } from '@nestjs/swagger';

export class GenerateSetPasswordLinkResponse {
  @ApiProperty()
  successMessage: string;

  @ApiProperty({ example: 'https://yourapp.com/set-password?token=abc123xyz789', description: 'Complete URL with token' })
  passwordLink: string;

  @ApiProperty({ example: '2024-10-18T12:00:00.000Z', description: 'ISO timestamp when the link expires' })
  expiresAt: string;
}
