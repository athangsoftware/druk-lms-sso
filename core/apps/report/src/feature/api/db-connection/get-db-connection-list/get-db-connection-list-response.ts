import { ApiProperty } from '@nestjs/swagger';
import { DbConnectionData } from '../create-db-connection/create-db-connection-response';

export class GetDbConnectionListResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [DbConnectionData] }) data: DbConnectionData[];
  @ApiProperty() pageNumber: number;
  @ApiProperty() pageSize: number;
  @ApiProperty() totalCount: number;
  @ApiProperty() orderByPropertyName: string;
  @ApiProperty() sortingDirection: string;
}
