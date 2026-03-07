import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class AiModifyChartRequest {
  @ApiProperty({ example: 'Change this chart to a pie chart grouped by region.' })
  @IsString({ message: ErrorMessages.string('prompt') })
  @IsNotEmpty({ message: ErrorMessages.required('prompt') })
  prompt: string;
}
