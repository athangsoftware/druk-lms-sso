import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class GenerateSetPasswordLinkRequest {
  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user to generate password link for' })
  @IsEmail({}, { message: ErrorMessages.invalidEmail('email') })
  @IsNotEmpty({ message: ErrorMessages.required('email') })
  email: string;

  @ApiProperty({ example: 'https://yourapp.com/set-password', description: 'Base URL where the user will be redirected to set password' })
  @IsString({ message: ErrorMessages.string('redirect URL') })
  @IsNotEmpty({ message: ErrorMessages.required('redirect URL') })
  redirectUrl: string;
}
