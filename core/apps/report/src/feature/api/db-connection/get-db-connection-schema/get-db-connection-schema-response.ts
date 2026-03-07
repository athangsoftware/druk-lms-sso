import { ApiProperty } from '@nestjs/swagger';

class ColumnInfoDto {
  @ApiProperty() columnName: string;
  @ApiProperty() dataType: string;
  @ApiProperty() isNullable: boolean;
}

class TableInfoDto {
  @ApiProperty() tableName: string;
  @ApiProperty({ type: [ColumnInfoDto] }) columns: ColumnInfoDto[];
}

export class GetDbConnectionSchemaResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [TableInfoDto] }) data: TableInfoDto[];
}
