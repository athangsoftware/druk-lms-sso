import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class ExecuteChartQueryRequest {
  @ApiPropertyOptional({ description: 'Dashboard ID to load filters from' })
  @IsOptional()
  @IsString()
  dashboardId?: string;

  @ApiPropertyOptional({
    description: 'Map of filterId → filter value',
    example: { 'filter-uuid-1': ['India', 'Nepal'], 'filter-uuid-2': 'Asia' },
  })
  @IsOptional()
  @IsObject()
  filterValues?: Record<string, unknown>;
}
