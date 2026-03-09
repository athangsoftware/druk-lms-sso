import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateIdentityProviderRequest {
  @ApiPropertyOptional({ example: 'Google', description: 'Display name of the provider' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional({ enum: ['OIDC', 'CUSTOM'], description: 'Provider type' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('type') })
  type?: string;

  @ApiPropertyOptional({ description: 'OAuth Client ID' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientId') })
  clientId?: string;

  @ApiPropertyOptional({ description: 'OAuth Client Secret (only updated if provided)' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientSecret') })
  clientSecret?: string;

  @ApiPropertyOptional({ description: 'Authorization URL' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('authorizationUrl') })
  authorizationUrl?: string;

  @ApiPropertyOptional({ description: 'Token URL' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('tokenUrl') })
  tokenUrl?: string;

  @ApiPropertyOptional({ description: 'User Info URL' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('userInfoUrl') })
  userInfoUrl?: string;

  @ApiPropertyOptional({ description: 'Redirect URL' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('redirectUrl') })
  redirectUrl?: string;

  @ApiPropertyOptional({ description: 'Space-separated scopes' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('scopes') })
  scopes?: string;

  @ApiPropertyOptional({ description: 'Icon URL for login screen' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('iconUrl') })
  iconUrl?: string;

  @ApiPropertyOptional({ description: 'Whether the provider is enabled' })
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('isEnabled') })
  isEnabled?: boolean;

  @ApiPropertyOptional({ description: 'Display order on login screen' })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiPropertyOptional({ description: 'Provider-specific metadata (JSON)' })
  @IsOptional()
  metadata?: any;
}
