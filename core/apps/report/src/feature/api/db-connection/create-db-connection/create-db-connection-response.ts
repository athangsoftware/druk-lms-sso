import { ApiProperty } from '@nestjs/swagger';
import { DbType } from '@app/prisma';

export class DbConnectionData {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ enum: DbType }) dbType: DbType;
  @ApiProperty() host: string;
  @ApiProperty() port: number;
  @ApiProperty() databaseName: string;
  @ApiProperty() username: string;
  @ApiProperty() createdAt: Date;
}

export class CreateDbConnectionResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: DbConnectionData }) data: DbConnectionData;
}
