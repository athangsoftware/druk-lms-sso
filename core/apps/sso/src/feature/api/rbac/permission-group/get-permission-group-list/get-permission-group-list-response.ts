import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class PermissionItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  actionId: string;

  @ApiPropertyOptional()
  groupId: string | null;

  @ApiPropertyOptional()
  resourceName: string;

  @ApiPropertyOptional()
  actionName: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;
}

class GetPermissionGroupListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiPropertyOptional({ type: [PermissionItem] })
  permissions: PermissionItem[];

  @ApiProperty()
  createdAt: Date;
}

export class GetPermissionGroupListResponse {
  @ApiProperty()
  successMessage: string;

  @ApiProperty({ type: [GetPermissionGroupListItem] })
  data: GetPermissionGroupListItem[];
}
