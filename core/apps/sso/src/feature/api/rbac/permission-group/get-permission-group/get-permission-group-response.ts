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

class GetPermissionGroupResponseData {
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

export class GetPermissionGroupResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: GetPermissionGroupResponseData })
  data: GetPermissionGroupResponseData | null;
}
