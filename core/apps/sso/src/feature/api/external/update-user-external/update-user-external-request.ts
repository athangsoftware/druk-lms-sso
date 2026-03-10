import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class UpdateUserExternalRequest {
  @ApiPropertyOptional({ example: 'John', description: 'First name of the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('first name') })
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('last name') })
  lastName?: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com', description: 'User email address' })
  @IsOptional()
  @IsEmail({}, { message: ErrorMessages.invalidEmail('email') })
  email?: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'User phone number' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('phone number') })
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'NDI123456', description: 'NDI identifier for the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('ndi identifier') })
  ndiIdentifier?: string;
}
