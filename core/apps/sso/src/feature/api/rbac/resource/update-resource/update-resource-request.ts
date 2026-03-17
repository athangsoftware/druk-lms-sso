import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class UpdateResourceRequest {
  @ApiPropertyOptional({ example: 'user', description: 'Resource name (module/entity)' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;
}
