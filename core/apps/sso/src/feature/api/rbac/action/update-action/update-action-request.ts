import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class UpdateActionRequest {
  @ApiPropertyOptional({ example: 'create', description: 'Action name (operation)' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;
}
