import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class ResetPasswordRequest {
  @ApiProperty({ example: 'abc123xyz789', description: 'Valid password reset token' })
  @IsString({ message: ErrorMessages.string('token') })
  @IsNotEmpty({ message: ErrorMessages.required('token') })
  token: string;

  @ApiProperty({ example: 'NewStrongP@ssw0rd123', description: 'New password for the user (minimum 6 characters)' })
  @IsString({ message: ErrorMessages.string('newPassword') })
  @IsNotEmpty({ message: ErrorMessages.required('newPassword') })
  @MinLength(6, { message: ErrorMessages.minSize('newPassword', 6) })
  newPassword: string;
}
