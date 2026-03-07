import { ApiProperty } from '@nestjs/swagger';
import { DbConnectionData } from '../create-db-connection/create-db-connection-response';

export class GetDbConnectionResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: DbConnectionData }) data: DbConnectionData;
}
