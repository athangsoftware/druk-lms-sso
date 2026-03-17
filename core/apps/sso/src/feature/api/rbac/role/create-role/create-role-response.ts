import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateRoleResponseData {
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

export class CreateRoleResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: CreateRoleResponseData })
  data: CreateRoleResponseData | null;
}
