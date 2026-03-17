import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class UpdateRoleRequest {
  @ApiPropertyOptional({ example: 'ADMIN', description: 'Role name' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional({ example: 'uuid', description: 'Parent role ID for hierarchy' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('parent role id') })
  parentRoleId?: string | null;

  @ApiPropertyOptional({ example: true, description: 'Active status' })
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('isActive') })
  isActive?: boolean;
}
