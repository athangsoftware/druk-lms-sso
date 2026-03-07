import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class CreateClientRequest {
  @ApiProperty({ example: 'My Application', description: 'Display name of the client' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;

  @ApiPropertyOptional({
    example: 'my-learning-app',
    description: 'Client ID used in OIDC flows. Must be lowercase alphanumeric with hyphens only. Auto-generated from name if omitted.',
  })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientId') })
  @Matches(/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/, {
    message: 'Client ID must be lowercase alphanumeric with hyphens only (e.g. my-app)',
  })
  clientId?: string;

  @ApiPropertyOptional({ enum: ['PUBLIC', 'CONFIDENTIAL'], example: 'PUBLIC', description: 'Client type' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientType') })
  clientType?: string;

  @ApiPropertyOptional({ example: false, description: 'Disable strict URL validation' })
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('disableStrictUrlValidation') })
  disableStrictUrlValidation?: boolean;

  @ApiPropertyOptional({ type: [String], example: ['https://app.example.com/callback'], description: 'Allowed redirect URLs' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: ErrorMessages.string('redirectUrls item') })
  redirectUrls?: string[];

  @ApiPropertyOptional({ type: [String], example: ['https://app.example.com/logout'], description: 'Allowed post-logout redirect URLs' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: ErrorMessages.string('postLogoutRedirectUrls item') })
  postLogoutRedirectUrls?: string[];
}
