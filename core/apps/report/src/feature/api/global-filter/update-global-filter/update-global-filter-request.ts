import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, IsEnum, Min } from 'class-validator';
import { MissingColumnBehavior } from '@app/prisma-report';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateGlobalFilterRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('column name') })
  columnName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('column value') })
  columnValue?: string;

  @ApiPropertyOptional({ enum: MissingColumnBehavior })
  @IsOptional()
  @IsEnum(MissingColumnBehavior, { message: ErrorMessages.enum('missing column behavior', MissingColumnBehavior) })
  missingColumnBehavior?: MissingColumnBehavior | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('is enabled') })
  isEnabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('order') })
  @Min(0)
  order?: number;
}
