import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateUserWithPasswordExternalResponseData {
  @ApiPropertyOptional()
  id: string | null;

  @ApiPropertyOptional()
  firstName: string | null;

  @ApiPropertyOptional()
  lastName: string | null;

  @ApiPropertyOptional()
  email: string | null;

  @ApiPropertyOptional()
  phoneNumber: string | null;

  @ApiPropertyOptional()
  username: string | null;

  @ApiPropertyOptional()
  role: string | null;

  @ApiPropertyOptional()
  ndiIdentifier: string | null;

  @ApiPropertyOptional()
  isVerified: boolean | null;

  @ApiPropertyOptional()
  isActive: boolean | null;
}

export class CreateUserWithPasswordExternalResponse {
  @ApiProperty()
  successMessage: string;

  @ApiPropertyOptional({ type: CreateUserWithPasswordExternalResponseData })
  data: CreateUserWithPasswordExternalResponseData | null;
}
