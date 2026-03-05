import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BhutanNdiSignInRequest {
  @ApiProperty({ description: 'The client ID associated with the login request' })
  @IsString()
  @IsOptional()
  client_id: string;

  @ApiProperty({ description: 'The redirect URI after login' })
  @IsOptional()
  @IsString()
  redirect_uri: string;

  @ApiProperty({ description: 'The code challenge for the login request' })
  @IsOptional()
  @IsString()
  code_challenge: string;

  @ApiProperty({ description: 'The method used to generate the code challenge' })
  @IsOptional()
  @IsString()
  code_challenge_method: string;

  @ApiProperty({ description: 'Optional state parameter', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  response_type?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  scope?: string;
}
