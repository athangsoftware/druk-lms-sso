import { ApiProperty } from '@nestjs/swagger';
import { MissingColumnBehavior } from '@app/prisma';

export class GlobalFilterOverrideData {
  @ApiProperty() id: string;
  @ApiProperty() globalFilterId: string;
  @ApiProperty() dashboardId: string;
  @ApiProperty() isDisabled: boolean;
  @ApiProperty({ required: false }) columnValue?: string | null;
  @ApiProperty({ enum: MissingColumnBehavior, required: false }) missingColumnBehavior?: MissingColumnBehavior | null;
}

export class UpsertGlobalFilterOverridesResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [GlobalFilterOverrideData] }) data: GlobalFilterOverrideData[];
}
