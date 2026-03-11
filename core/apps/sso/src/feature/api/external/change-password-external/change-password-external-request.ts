import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ErrorMessages } from '../../../../core/models/message';

export class ChangePasswordExternalRequest {
  @ApiProperty({ example: 'OldP@ssw0rd', description: 'Current password of the user' })
  @IsString({ message: ErrorMessages.string('current password') })
  @IsNotEmpty({ message: ErrorMessages.required('current password') })
  currentPassword: string;

  @ApiProperty({ example: 'NewP@ssw0rd', description: 'New password for the user (min 6 characters)' })
  @IsString({ message: ErrorMessages.string('new password') })
  @IsNotEmpty({ message: ErrorMessages.required('new password') })
  @MinLength(6)
  newPassword: string;
}
