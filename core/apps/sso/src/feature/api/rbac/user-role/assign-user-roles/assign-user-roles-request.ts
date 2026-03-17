import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class AssignUserRolesRequest {
  @ApiProperty({ type: [String], description: 'Role IDs to assign' })
  @IsNotEmpty({ message: ErrorMessages.required('role ids') })
  roleIds: string[];
}
