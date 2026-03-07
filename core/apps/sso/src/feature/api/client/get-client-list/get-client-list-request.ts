import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SortingDirection } from '../../../../core/models/sorting-direction';
import { ErrorMessages } from '../../../../core/models/message';

export class GetClientListRequest {
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
  @IsString({ message: ErrorMessages.string('sorting direction') })
  @Transform(({ value }) => (value === '' ? undefined : value))
  sortingDirection: SortingDirection = SortingDirection.DESC;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('order by property name') })
  orderByPropertyName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('search term') })
  search: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name value') })
  nameValue: string;

  @ApiPropertyOptional({ enum: ['contains', 'exact'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name operation') })
  nameOperation: 'contains' | 'exact';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientId value') })
  clientIdValue: string;

  @ApiPropertyOptional({ enum: ['contains', 'exact'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientId operation') })
  clientIdOperation: 'contains' | 'exact';

  @ApiPropertyOptional({ enum: ['PUBLIC', 'CONFIDENTIAL'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('clientType value') })
  @Transform(({ value }) => (value === '' || value === 'undefined' ? undefined : value))
  clientTypeValue: string;
}
