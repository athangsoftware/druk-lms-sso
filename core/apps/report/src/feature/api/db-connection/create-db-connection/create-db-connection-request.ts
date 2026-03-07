import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { DbType } from '@app/prisma-report';
import { ErrorMessages } from '../../../../core/models/message';

export class CreateDbConnectionRequest {
  @ApiProperty({ example: 'My Production DB' })
  @IsString({ message: ErrorMessages.string('name') })
  @IsNotEmpty({ message: ErrorMessages.required('name') })
  name: string;

  @ApiProperty({ enum: DbType, example: DbType.MYSQL })
  @IsEnum(DbType, { message: ErrorMessages.enum('db type', DbType) })
  @IsNotEmpty({ message: ErrorMessages.required('db type') })
  dbType: DbType;

  @ApiProperty({ example: 'localhost' })
  @IsString({ message: ErrorMessages.string('host') })
  @IsNotEmpty({ message: ErrorMessages.required('host') })
  host: string;

  @ApiProperty({ example: 3306 })
  @IsInt({ message: ErrorMessages.number('port') })
  @Min(1)
  @Max(65535)
  port: number;

  @ApiProperty({ example: 'my_database' })
  @IsString({ message: ErrorMessages.string('database name') })
  @IsNotEmpty({ message: ErrorMessages.required('database name') })
  databaseName: string;

  @ApiProperty({ example: 'root' })
  @IsString({ message: ErrorMessages.string('username') })
  @IsNotEmpty({ message: ErrorMessages.required('username') })
  username: string;

  @ApiProperty({ example: 'secret' })
  @IsString({ message: ErrorMessages.string('password') })
  @IsNotEmpty({ message: ErrorMessages.required('password') })
  password: string;
}
