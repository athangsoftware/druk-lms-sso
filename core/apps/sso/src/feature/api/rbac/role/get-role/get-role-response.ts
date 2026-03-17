import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class RoleChildItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  parentRoleId: string | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;
}

class GetRoleResponseData {
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

  @ApiPropertyOptional({ type: [String] })
  permissions: string[];

  @ApiPropertyOptional({ type: [RoleChildItem] })
  children: RoleChildItem[];
}

export class GetRoleResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: GetRoleResponseData })
  data: GetRoleResponseData | null;
}
