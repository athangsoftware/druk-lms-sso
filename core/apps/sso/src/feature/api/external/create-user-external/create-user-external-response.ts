import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateUserExternalResponseData {
  @ApiPropertyOptional()
  id: string | null;

  @ApiPropertyOptional()
  firstName: string | null;

  @ApiPropertyOptional()
  lastName: string | null;

  @ApiPropertyOptional()
  email: string | null;

  @ApiPropertyOptional()
  phoneNumber: string | null;

  @ApiPropertyOptional()
  username: string | null;

  @ApiPropertyOptional()
  role: string | null;

  @ApiPropertyOptional()
  ndiIdentifier: string | null;

  @ApiPropertyOptional()
  isVerified: boolean | null;

  @ApiPropertyOptional()
  isActive: boolean | null;
}

export class CreateUserExternalResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: CreateUserExternalResponseData })
  data: CreateUserExternalResponseData | null;

  @ApiProperty({ example: 'https://yourapp.com/set-password?token=abc123...', description: 'Password reset link for the created user' })
  passwordLink: string;

  @ApiProperty({ example: '2024-10-19T12:00:00.000Z', description: 'Password reset link expiration date in ISO format' })
  expiresAt: string;
}
