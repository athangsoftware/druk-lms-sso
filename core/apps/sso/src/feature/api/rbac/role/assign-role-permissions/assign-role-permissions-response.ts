import { ApiProperty } from '@nestjs/swagger';

export class AssignRolePermissionsResponse {
  @ApiProperty()
  successMessage: string;
}
