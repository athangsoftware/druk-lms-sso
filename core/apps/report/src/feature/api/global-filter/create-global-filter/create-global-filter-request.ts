import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsEnum, Min } from 'class-validator';
import { MissingColumnBehavior } from '@app/prisma-report';
import { ErrorMessages } from '../../../../core/models/message';

export class CreateGlobalFilterRequest {
  @ApiProperty({ example: 'tenant_id' })
  @IsString({ message: ErrorMessages.string('column name') })
  @IsNotEmpty({ message: ErrorMessages.required('column name') })
  columnName: string;

  @ApiProperty({ example: 'a' })
  @IsString({ message: ErrorMessages.string('column value') })
  @IsNotEmpty({ message: ErrorMessages.required('column value') })
  columnValue: string;

  @ApiPropertyOptional({ enum: MissingColumnBehavior })
  @IsOptional()
  @IsEnum(MissingColumnBehavior, { message: ErrorMessages.enum('missing column behavior', MissingColumnBehavior) })
  missingColumnBehavior?: MissingColumnBehavior;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('is enabled') })
  isEnabled?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('order') })
  @Min(0)
  order?: number;
}
