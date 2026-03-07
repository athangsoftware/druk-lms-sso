import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class GetAiProviderListRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: ErrorMessages.number('pageNumber') })
  pageNumber: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: ErrorMessages.number('pageSize') })
  pageSize: number = 50;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('search term') })
  search: string;
}
