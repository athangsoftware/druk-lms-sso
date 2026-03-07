import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterValueItem {
  @ApiPropertyOptional({ description: 'Dashboard filter ID' })
  filterId: string;

  @ApiPropertyOptional({ description: 'Filter value (type depends on filter type)' })
  value: unknown;
}

export class ExecuteChartQueryRequest {
  @ApiPropertyOptional({
    type: [FilterValueItem],
    description: 'Optional dashboard filter values to apply to the chart query',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterValueItem)
  filters?: FilterValueItem[];
}
