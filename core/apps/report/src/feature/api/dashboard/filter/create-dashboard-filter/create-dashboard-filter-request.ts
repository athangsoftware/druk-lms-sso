import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { FilterType } from '@app/prisma';
import { ErrorMessages } from '../../../../../core/models/message';

export class CreateDashboardFilterRequest {
  @ApiProperty({ example: 'Country Filter' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;

  @ApiProperty({ enum: FilterType, example: 'MULTI_SELECT' })
  @IsEnum(FilterType, { message: ErrorMessages.enum('filter type', FilterType) })
  filterType: FilterType;

  @ApiProperty()
  @IsString({ message: ErrorMessages.string('connection id') })
  @IsNotEmpty({ message: ErrorMessages.required('connection id') })
  connectionId: string;

  @ApiProperty({ example: 'country' })
  @IsString({ message: ErrorMessages.string('target column') })
  @IsNotEmpty({ message: ErrorMessages.required('target column') })
  targetColumn: string;

  @ApiPropertyOptional({ example: 'SELECT DISTINCT country FROM customers ORDER BY country' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('source query') })
  sourceQuery?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('default value') })
  defaultValue?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('order') })
  @Min(0)
  order?: number;
}
