import { ErrorMessages } from '../../../../core/models/message';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserType } from '@app/prisma-sso';
import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';

export class UpdateUserRequest {
  @ApiPropertyOptional({ example: 'John', description: 'First name of the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('first name') })
  firstName: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('last name') })
  lastName: string;

  @ApiPropertyOptional({ example: 'john@example.com', description: 'Email of the user' })
  @IsOptional()
  @IsEmail({}, { message: ErrorMessages.invalidEmail('email') })
  email: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'Phone number of the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('phone number') })
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'InternalUser', description: 'User type of the user' })
  @IsOptional()
  @IsString({ message: ErrorMessages.string('user type') })
  @IsEnum(UserType, { message: ErrorMessages.enum('user type', UserType) })
  userType: UserType;

  @ApiPropertyOptional({ enum: UserType, example: UserType.InternalUser, description: 'Legacy role value (for backwards compatibility)' })
  @IsOptional()
  role?: UserType;
}
