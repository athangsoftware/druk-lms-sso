import { ApiProperty } from '@nestjs/swagger';
import { MissingColumnBehavior } from '@app/prisma';

export class GlobalFilterData {
  @ApiProperty() id: string;
  @ApiProperty() columnName: string;
  @ApiProperty() columnValue: string;
  @ApiProperty({ enum: MissingColumnBehavior, required: false }) missingColumnBehavior?: MissingColumnBehavior | null;
  @ApiProperty() isEnabled: boolean;
  @ApiProperty() order: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date | null;
}

export class CreateGlobalFilterResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: GlobalFilterData }) data: GlobalFilterData;
}
