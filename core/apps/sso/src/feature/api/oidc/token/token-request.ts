/* eslint-disable @typescript-eslint/naming-convention */
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class TokenRequest {
  @IsEnum(['authorization_code', 'refresh_token', 'client_credentials'], {
    message: 'grant_type must be "authorization_code", "refresh_token", or "client_credentials"',
  })
  grant_type: 'authorization_code' | 'refresh_token' | 'client_credentials';

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  code_verifier?: string;

  @IsString()
  @IsOptional()
  redirect_uri?: string;

  @IsString()
  @IsNotEmpty()
  client_id: string;

  @IsString()
  @IsOptional()
  client_secret?: string;

  @IsString()
  @IsOptional()
  refresh_token?: string;
}
