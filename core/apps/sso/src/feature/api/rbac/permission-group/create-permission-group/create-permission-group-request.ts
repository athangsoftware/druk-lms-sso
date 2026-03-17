import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class CreatePermissionGroupRequest {
  @ApiProperty({ example: 'User Management', description: 'Permission group name' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;

  @ApiPropertyOptional({ example: 'Permissions related to user operations', description: 'Group description' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('description') })
  description?: string;
}
