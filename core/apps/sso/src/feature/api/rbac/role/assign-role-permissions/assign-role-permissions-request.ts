import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class AssignRolePermissionsRequest {
  @ApiProperty({ type: [String], description: 'Permission IDs to assign' })
  @IsNotEmpty({ message: ErrorMessages.required('permission ids') })
  permissionIds: string[];
}
