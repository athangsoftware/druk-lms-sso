import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class GetPermissionListItem {
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

  @ApiPropertyOptional()
  groupName: string | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;
}

export class GetPermissionListResponse {
  @ApiProperty()
  successMessage: string;

  @ApiProperty({ type: [GetPermissionListItem] })
  data: GetPermissionListItem[];
}
