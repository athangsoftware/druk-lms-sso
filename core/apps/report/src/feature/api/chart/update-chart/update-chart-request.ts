import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ChartType } from '@app/prisma';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateChartRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('sql query') })
  sqlQuery?: string;

  @ApiPropertyOptional({ enum: ChartType })
  @IsOptional()
  @IsEnum(ChartType, { message: ErrorMessages.enum('chart type', ChartType) })
  chartType?: ChartType;

  @ApiPropertyOptional()
  @IsOptional()
  chartConfig?: Record<string, unknown>;
}
