import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UpdateRoleResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  parentRoleId: string | null;

  @ApiPropertyOptional()
  parentRoleName: string | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;
}

export class UpdateRoleResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: UpdateRoleResponseData })
  data: UpdateRoleResponseData | null;
}
