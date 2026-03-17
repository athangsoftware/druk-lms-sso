import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class CreatePermissionRequest {
  @ApiProperty({ example: 'uuid', description: 'Resource ID' })
  @IsString({ message: ErrorMessages.string('resource id') })
  @IsNotEmpty({ message: ErrorMessages.required('resource id') })
  resourceId: string;

  @ApiProperty({ example: 'uuid', description: 'Action ID' })
  @IsString({ message: ErrorMessages.string('action id') })
  @IsNotEmpty({ message: ErrorMessages.required('action id') })
  actionId: string;

  @ApiPropertyOptional({ example: 'uuid', description: 'Permission group ID' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('group id') })
  groupId?: string;
}
