import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class CreateAiProviderRequest {
  @ApiProperty({ example: 'OpenAI GPT-4o' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;

  @ApiProperty({ example: 'gpt-4o' })
  @IsString({ message: ErrorMessages.string('model') })
  @IsNotEmpty({ message: ErrorMessages.required('model') })
  model: string;

  @ApiProperty({ example: 'sk-...' })
  @IsString({ message: ErrorMessages.string('api key') })
  @IsNotEmpty({ message: ErrorMessages.required('api key') })
  apiKey: string;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean({ message: ErrorMessages.boolean('is enabled') })
  isEnabled?: boolean;
}
