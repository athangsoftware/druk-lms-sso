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

class GetRoleListItem {
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

  @ApiPropertyOptional({ type: [String] })
  permissionIds: string[];

  @ApiPropertyOptional({ type: [RoleChildItem] })
  children: RoleChildItem[];
}

export class GetRoleListResponse {
  @ApiProperty()
  successMessage: string;

  @ApiProperty({ type: [GetRoleListItem] })
  data: GetRoleListItem[];
}
