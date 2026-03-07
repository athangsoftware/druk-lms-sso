import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateAiProviderRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('model') })
  model?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('api key') })
  apiKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('is enabled') })
  isEnabled?: boolean;
}
