import { ApiProperty } from '@nestjs/swagger';
import { SortingDirection } from '../../../../core/models/sorting-direction';

class GetClientListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  clientType: string;

  @ApiProperty()
  disableStrictUrlValidation: boolean;

  @ApiProperty({ type: [String] })
  redirectUrls: string[];

  @ApiProperty({ type: [String] })
  postLogoutRedirectUrls: string[];

  @ApiProperty()
  createdAt: Date;
}

export class GetClientListResponse {
  @ApiProperty()
  successMessage: string;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  orderByPropertyName: string;

  @ApiProperty()
  sortingDirection: SortingDirection;

  @ApiProperty({ type: [GetClientListItem] })
  data: GetClientListItem[];
}
