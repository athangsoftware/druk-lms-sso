import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MissingColumnBehavior } from '@app/prisma';
import { ErrorMessages } from '../../../../../core/models/message';

export class GlobalFilterOverrideItemRequest {
  @ApiProperty()
  @IsString({ message: ErrorMessages.string('global filter id') })
  @IsNotEmpty({ message: ErrorMessages.required('global filter id') })
  globalFilterId: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('is disabled') })
  isDisabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('column value') })
  columnValue?: string | null;

  @ApiPropertyOptional({ enum: MissingColumnBehavior })
  @IsOptional()
  @IsEnum(MissingColumnBehavior, { message: ErrorMessages.enum('missing column behavior', MissingColumnBehavior) })
  missingColumnBehavior?: MissingColumnBehavior | null;
}
