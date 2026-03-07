import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { DbType } from '@app/prisma';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateDbConnectionRequest {
  @ApiPropertyOptional({ example: 'My Production DB' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('name') })
  name?: string;

  @ApiPropertyOptional({ enum: DbType })
  @IsOptional()
  @IsEnum(DbType, { message: ErrorMessages.enum('db type', DbType) })
  dbType?: DbType;

  @ApiPropertyOptional({ example: 'localhost' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('host') })
  host?: string;

  @ApiPropertyOptional({ example: 3306 })
  @IsOptional()
  @IsInt({ message: ErrorMessages.number('port') })
  @Min(1)
  @Max(65535)
  port?: number;

  @ApiPropertyOptional({ example: 'my_database' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('database name') })
  databaseName?: string;

  @ApiPropertyOptional({ example: 'root' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('username') })
  username?: string;

  @ApiPropertyOptional({ example: 'newpassword' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('password') })
  password?: string;
}
