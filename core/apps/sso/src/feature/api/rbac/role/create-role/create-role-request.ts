import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class CreateRoleRequest {
  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;

  @ApiPropertyOptional({ example: 'uuid', description: 'Parent role ID for hierarchy' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('parent role id') })
  parentRoleId?: string;
}
