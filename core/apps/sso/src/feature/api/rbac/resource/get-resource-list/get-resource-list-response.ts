import { ApiProperty } from '@nestjs/swagger';

class GetResourceListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}

export class GetResourceListResponse {
  @ApiProperty()
  successMessage: string;

  @ApiProperty({ type: [GetResourceListItem] })
  data: GetResourceListItem[];
}
