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
}
