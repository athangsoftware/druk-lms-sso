import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class CreateUserExternalRequest {
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

  @ApiPropertyOptional({ example: '+1234567890', description: 'User phone number' })
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'NDI123456', description: 'NDI identifier for the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('ndi identifier') })
  ndiIdentifier?: string;

  @ApiProperty({ example: 'https://yourapp.com/set-password', description: 'Base URL where the user will be redirected to set password' })
  @IsString({ message: ErrorMessages.string('redirect URL') })
  @IsNotEmpty({ message: ErrorMessages.required('redirect URL') })
  redirectUrl: string;
}
