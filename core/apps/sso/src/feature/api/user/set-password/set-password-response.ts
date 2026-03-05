import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class SetPasswordResponseData {
  @ApiPropertyOptional()
  id: string | null;

  @ApiPropertyOptional()
  email: string | null;

  @ApiPropertyOptional()
  firstName: string | null;

  @ApiPropertyOptional()
  lastName: string | null;

  @ApiPropertyOptional()
  passwordSet: boolean;
}

export class SetPasswordResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: SetPasswordResponseData })
  data: SetPasswordResponseData | null;
}
