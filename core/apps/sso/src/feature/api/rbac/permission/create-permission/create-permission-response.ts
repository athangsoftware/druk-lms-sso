import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreatePermissionResponseData {
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

export class CreatePermissionResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: CreatePermissionResponseData })
  data: CreatePermissionResponseData | null;
}
