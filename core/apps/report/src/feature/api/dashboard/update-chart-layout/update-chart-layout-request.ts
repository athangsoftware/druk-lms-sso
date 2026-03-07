import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateChartLayoutRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('positionX') })
  @Min(0)
  positionX?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('positionY') })
  @Min(0)
  positionY?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('width') })
  @Min(1)
  width?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('height') })
  @Min(1)
  height?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('order') })
  @Min(0)
  order?: number;
}
