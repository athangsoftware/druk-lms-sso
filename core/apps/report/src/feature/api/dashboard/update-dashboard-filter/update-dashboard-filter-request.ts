import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { FilterType } from '@app/prisma';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateDashboardFilterRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional({ enum: FilterType })
  @IsOptional()
  @IsEnum(FilterType, { message: ErrorMessages.enum('filterType', FilterType) })
  filterType?: FilterType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('connectionId') })
  connectionId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('targetColumn') })
  targetColumn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('sourceQuery') })
  sourceQuery?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('defaultValue') })
  defaultValue?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('order') })
  @Min(0)
  order?: number;
}
