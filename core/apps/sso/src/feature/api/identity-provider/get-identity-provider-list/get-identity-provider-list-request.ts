import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SortingDirection } from '../../../../core/models/sorting-direction';
import { ErrorMessages } from '../../../../core/models/message';

export class GetIdentityProviderListRequest {
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
  sortingDirection: SortingDirection = SortingDirection.ASC;

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
  @IsString({ message: ErrorMessages.string('slug value') })
  slugValue: string;

  @ApiPropertyOptional({ enum: ['contains', 'exact'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('slug operation') })
  slugOperation: 'contains' | 'exact';

  @ApiPropertyOptional({ enum: ['GOOGLE', 'NDI', 'OIDC', 'CUSTOM'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('type value') })
  @Transform(({ value }) => (value === '' || value === 'undefined' ? undefined : value))
  typeValue: string;

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('isEnabled value') })
  @Transform(({ value }) => (value === '' || value === 'undefined' ? undefined : value))
  isEnabledValue: string;
}
