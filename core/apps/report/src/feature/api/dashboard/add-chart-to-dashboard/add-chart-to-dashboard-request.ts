import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class AddChartToDashboardRequest {
  @ApiProperty()
  @IsString({ message: ErrorMessages.string('chart id') })
  @IsNotEmpty({ message: ErrorMessages.required('chart id') })
  chartId: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('positionX') })
  @Min(0)
  positionX?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('positionY') })
  @Min(0)
  positionY?: number;

  @ApiPropertyOptional({ default: 6 })
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('width') })
  @Min(1)
  width?: number;

  @ApiPropertyOptional({ default: 4 })
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('height') })
  @Min(1)
  height?: number;
}
