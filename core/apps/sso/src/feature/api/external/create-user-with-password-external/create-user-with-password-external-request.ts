import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class CreateUserWithPasswordExternalRequest {
  @ApiProperty()
  @IsString({ message: ErrorMessages.string('id') })
  @IsNotEmpty({ message: ErrorMessages.required('id') })
  id: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString({ message: ErrorMessages.string('first name') })
  @IsNotEmpty({ message: ErrorMessages.required('first name') })
  firstName: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('last name') })
  lastName?: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email address' })
  @IsEmail({}, { message: ErrorMessages.invalidEmail('email') })
  @IsNotEmpty({ message: ErrorMessages.required('email') })
  email: string;

  @ApiProperty({ example: 'P@ssw0rd', description: 'Password for the user (min 6 characters)' })
  @IsString({ message: ErrorMessages.string('password') })
  @IsNotEmpty({ message: ErrorMessages.required('password') })
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'User phone number' })
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'NDI123456', description: 'NDI identifier for the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('ndi identifier') })
  ndiIdentifier?: string;
}
