import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { FilterType } from '@app/prisma-report';
import { ErrorMessages } from '../../../../../core/models/message';

export class UpdateDashboardFilterRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional({ enum: FilterType })
  @IsOptional()
  @IsEnum(FilterType, { message: ErrorMessages.enum('filter type', FilterType) })
  filterType?: FilterType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('connection id') })
  connectionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('target column') })
  targetColumn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('source query') })
  sourceQuery?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('default value') })
  defaultValue?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('order') })
  @Min(0)
  order?: number;
}
