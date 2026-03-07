import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class GenerateDashboardFilterRequest {
  @ApiProperty({ example: 'mariadb-connection-id' })
  @IsString({ message: ErrorMessages.string('connection id') })
  @IsNotEmpty({ message: ErrorMessages.required('connection id') })
  connectionId: string;

  @ApiProperty({ example: 'country filter for sales dashboard' })
  @IsString({ message: ErrorMessages.string('prompt') })
  @IsNotEmpty({ message: ErrorMessages.required('prompt') })
  prompt: string;
}
