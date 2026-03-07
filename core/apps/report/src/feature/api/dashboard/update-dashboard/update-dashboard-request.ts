import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateDashboardRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('description') })
  description?: string;
}
