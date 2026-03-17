import { ApiProperty } from '@nestjs/swagger';

export class AssignUserRolesResponse {
  @ApiProperty()
  successMessage: string;
}
