import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateClientRequest {
  @ApiPropertyOptional({ example: 'My Application', description: 'Display name of the client' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional({ enum: ['PUBLIC', 'CONFIDENTIAL'], description: 'Client type' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientType') })
  clientType?: string;

  @ApiPropertyOptional({ description: 'Disable strict URL validation' })
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('disableStrictUrlValidation') })
  disableStrictUrlValidation?: boolean;

  @ApiPropertyOptional({ type: [String], description: 'Allowed redirect URLs (replaces existing)' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: ErrorMessages.string('redirectUrls item') })
  redirectUrls?: string[];

  @ApiPropertyOptional({ type: [String], description: 'Allowed post-logout redirect URLs (replaces existing)' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: ErrorMessages.string('postLogoutRedirectUrls item') })
  postLogoutRedirectUrls?: string[];
}
