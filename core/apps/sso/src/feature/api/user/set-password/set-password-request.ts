import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class SetPasswordRequest {
  @ApiProperty({ example: 'abc123xyz789', description: 'Password reset token received from the generate link API' })
  @IsString({ message: ErrorMessages.string('token') })
  @IsNotEmpty({ message: ErrorMessages.required('token') })
  token: string;

  @ApiProperty({ example: 'StrongP@ssw0rd123', description: 'New password for the user' })
  @IsString({ message: ErrorMessages.string('password') })
  @IsNotEmpty({ message: ErrorMessages.required('password') })
  @MinLength(6, { message: ErrorMessages.minSize('password', 6) })
  password: string;
}
