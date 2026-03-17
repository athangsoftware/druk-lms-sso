import { ApiProperty } from '@nestjs/swagger';

class GetActionListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}

export class GetActionListResponse {
  @ApiProperty()
  successMessage: string;

  @ApiProperty({ type: [GetActionListItem] })
  data: GetActionListItem[];
}
