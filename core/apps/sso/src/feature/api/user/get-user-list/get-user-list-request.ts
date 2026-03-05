import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortingDirection } from '../../../../core/models/sorting-direction';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class GetUserListRequest {
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
  @IsString({ message: ErrorMessages.string('firstName value') })
  firstNameValue: string;

  @ApiPropertyOptional({ enum: ['contains', 'exact'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('firstName operation') })
  firstNameOperation: 'contains' | 'exact';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('lastName value') })
  lastNameValue: string;

  @ApiPropertyOptional({ enum: ['contains', 'exact'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('lastName operation') })
  lastNameOperation: 'contains' | 'exact';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('email value') })
  emailValue: string;

  @ApiPropertyOptional({ enum: ['contains', 'exact'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('email operation') })
  emailOperation: 'contains' | 'exact';

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  @IsString({ each: true, message: ErrorMessages.string('roleId value') })
  roleIdValue: string[];

  @ApiPropertyOptional({ enum: ['contains', 'exact'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('roleId operation') })
  roleIdOperation: 'contains' | 'exact';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ErrorMessages.string('phone number value') })
  phoneNumberValue: string;

  @ApiPropertyOptional({ enum: ['contains', 'exact'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('phone number operation') })
  phoneNumberOperation: 'contains' | 'exact';

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('isActive value') })
  isActiveValue: 'true' | 'false';
}
