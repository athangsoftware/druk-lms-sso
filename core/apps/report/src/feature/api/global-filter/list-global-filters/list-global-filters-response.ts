import { ApiProperty } from '@nestjs/swagger';
import { MissingColumnBehavior } from '@app/prisma';

export class GlobalFilterListItem {
  @ApiProperty() id: string;
  @ApiProperty() columnName: string;
  @ApiProperty() columnValue: string;
  @ApiProperty({ enum: MissingColumnBehavior, required: false }) missingColumnBehavior?: MissingColumnBehavior | null;
  @ApiProperty() isEnabled: boolean;
  @ApiProperty() order: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date | null;
}

export class ListGlobalFiltersResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [GlobalFilterListItem] }) data: GlobalFilterListItem[];
}
