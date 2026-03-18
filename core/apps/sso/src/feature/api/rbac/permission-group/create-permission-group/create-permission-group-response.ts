import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreatePermissionGroupResponseData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiPropertyOptional()
  clientId: string | null;

  @ApiPropertyOptional()
  clientName: string | null;

  @ApiProperty()
  createdAt: Date;
}

export class CreatePermissionGroupResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: CreatePermissionGroupResponseData })
  data: CreatePermissionGroupResponseData | null;
}
