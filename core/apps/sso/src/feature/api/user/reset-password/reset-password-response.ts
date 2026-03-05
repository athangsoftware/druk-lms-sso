import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ResetPasswordResponseData {
  @ApiPropertyOptional()
  id: string | null;

  @ApiPropertyOptional()
  email: string | null;

  @ApiPropertyOptional()
  firstName: string | null;

  @ApiPropertyOptional()
  lastName: string | null;

  @ApiPropertyOptional()
  passwordReset: boolean;
}

export class ResetPasswordResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: ResetPasswordResponseData })
  data: ResetPasswordResponseData | null;
}
