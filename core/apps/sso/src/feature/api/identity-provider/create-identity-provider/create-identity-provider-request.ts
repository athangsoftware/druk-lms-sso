import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class CreateIdentityProviderRequest {
  @ApiProperty({ example: 'Google', description: 'Display name of the provider' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;

  @ApiPropertyOptional({ example: 'google', description: 'Unique slug identifier (auto-derived from name if omitted)' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('slug') })
  @Matches(/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/, {
    message: 'Slug must be lowercase alphanumeric with hyphens only (e.g. google, bhutan-ndi)',
  })
  slug?: string;

  @ApiPropertyOptional({ enum: ['OIDC', 'CUSTOM'], example: 'OIDC', description: 'Provider type' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('type') })
  type?: string;

  @ApiPropertyOptional({ example: '320804...apps.googleusercontent.com', description: 'OAuth Client ID' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientId') })
  clientId?: string;

  @ApiPropertyOptional({ description: 'OAuth Client Secret' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientSecret') })
  clientSecret?: string;

  @ApiPropertyOptional({ example: 'https://accounts.google.com/o/oauth2/v2/auth', description: 'Authorization URL' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('authorizationUrl') })
  authorizationUrl?: string;

  @ApiPropertyOptional({ example: 'https://oauth2.googleapis.com/token', description: 'Token URL' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('tokenUrl') })
  tokenUrl?: string;

  @ApiPropertyOptional({ example: 'https://www.googleapis.com/oauth2/v3/userinfo', description: 'User Info URL' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('userInfoUrl') })
  userInfoUrl?: string;

  @ApiPropertyOptional({ example: 'http://localhost:3000/auth/google/callback', description: 'Redirect URL' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('redirectUrl') })
  redirectUrl?: string;

  @ApiPropertyOptional({ example: 'openid profile email', description: 'Space-separated scopes' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('scopes') })
  scopes?: string;

  @ApiPropertyOptional({ example: '/icons/google.svg', description: 'Icon URL for login screen' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('iconUrl') })
  iconUrl?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the provider is enabled' })
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('isEnabled') })
  isEnabled?: boolean;

  @ApiPropertyOptional({ example: 0, description: 'Display order on login screen' })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiPropertyOptional({ description: 'Provider-specific metadata (JSON)' })
  @IsOptional()
  metadata?: any;
}
