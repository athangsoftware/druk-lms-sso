import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ChartType } from '@app/prisma-report';
import { ErrorMessages } from '../../../../core/models/message';

export class GenerateChartRequest {
  @ApiProperty({ example: 'monthly-conn-uuid' })
  @IsString({ message: ErrorMessages.string('connection id') })
  @IsNotEmpty({ message: ErrorMessages.required('connection id') })
  connectionId: string;

  @ApiProperty({ example: 'Show monthly sales for the last 12 months as a bar chart.' })
  @IsString({ message: ErrorMessages.string('prompt') })
  @IsNotEmpty({ message: ErrorMessages.required('prompt') })
  prompt: string;
}
