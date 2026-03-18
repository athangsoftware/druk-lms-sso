import { ApiProperty } from '@nestjs/swagger';

export class GetMyPermissionsResponse {
  @ApiProperty()
  successMessage: string;

  @ApiProperty()
  data: {
    roles: string[];
    permissions: string[];
  };
}
