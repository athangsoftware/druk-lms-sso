import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class UpdatePermissionGroupRequest {
  @ApiPropertyOptional({ example: 'User Management', description: 'Permission group name' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional({ example: 'Permissions related to user operations', description: 'Group description' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('description') })
  description?: string;

  @ApiPropertyOptional({ example: 'iam', description: 'Client ID for grouping' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientId') })
  clientId?: string;
}
