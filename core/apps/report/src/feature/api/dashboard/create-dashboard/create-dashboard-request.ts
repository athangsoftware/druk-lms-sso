import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class CreateDashboardRequest {
  @ApiProperty({ example: 'Sales Overview' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('description') })
  description?: string;
}
