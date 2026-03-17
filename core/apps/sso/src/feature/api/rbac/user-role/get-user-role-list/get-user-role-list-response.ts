import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class GetUserRoleListResponseData {
  @ApiProperty()
  userId: string;

  @ApiProperty({ type: [String] })
  roles: string[];

  @ApiPropertyOptional({ type: [String] })
  permissions: string[];
}

export class GetUserRoleListResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: GetUserRoleListResponseData })
  data: GetUserRoleListResponseData | null;
}
