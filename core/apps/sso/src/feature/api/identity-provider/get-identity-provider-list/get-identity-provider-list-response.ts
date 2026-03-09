import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class GetIdentityProviderListItemData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  iconUrl: string | null;

  @ApiProperty()
  isEnabled: boolean;

  @ApiProperty()
  displayOrder: number;

  @ApiProperty()
  createdAt: Date;
}

export class GetIdentityProviderListResponse {
  @ApiProperty()
  successMessage: string;

  @ApiProperty()
  orderByPropertyName: string;

  @ApiProperty()
  sortingDirection: string;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  totalCount: number;

  @ApiProperty({ type: [GetIdentityProviderListItemData] })
  data: GetIdentityProviderListItemData[];
}
