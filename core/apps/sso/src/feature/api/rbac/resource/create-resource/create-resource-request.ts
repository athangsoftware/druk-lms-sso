import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../../core/models/message';

export class CreateResourceRequest {
  @ApiProperty({ example: 'user', description: 'Resource name (module/entity)' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;
}
