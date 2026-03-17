import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UpdatePermissionGroupResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiProperty()
  createdAt: Date;
}

export class UpdatePermissionGroupResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: UpdatePermissionGroupResponseData })
  data: UpdatePermissionGroupResponseData | null;
}
