import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { FilterType } from '@app/prisma';
import { ErrorMessages } from '../../../../core/models/message';

export class CreateDashboardFilterRequest {
  @ApiProperty({ example: 'Country Filter' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;

  @ApiProperty({ enum: FilterType, example: FilterType.MULTI_SELECT })
  @IsEnum(FilterType, { message: ErrorMessages.enum('filterType', FilterType) })
  filterType: FilterType;

  @ApiPropertyOptional({ description: 'DB connection ID (required for MULTI_SELECT / SINGLE_SELECT)' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('connectionId') })
  connectionId?: string;

  @ApiProperty({ description: 'Target column name in the query', example: 'country' })
  @IsString({ message: ErrorMessages.string('targetColumn') })
  @IsNotEmpty({ message: ErrorMessages.required('targetColumn') })
  targetColumn: string;

  @ApiPropertyOptional({
    description: 'SQL query to populate select options (required for MULTI_SELECT / SINGLE_SELECT)',
    example: 'SELECT DISTINCT country FROM customers ORDER BY country',
  })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('sourceQuery') })
  sourceQuery?: string;

  @ApiPropertyOptional({ description: 'Default filter value' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('defaultValue') })
  defaultValue?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('order') })
  @Min(0)
  order?: number;
}
