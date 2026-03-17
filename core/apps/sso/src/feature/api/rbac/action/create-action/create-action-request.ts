import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class CreateActionRequest {
  @ApiProperty({ example: 'create', description: 'Action name (operation)' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;
}
