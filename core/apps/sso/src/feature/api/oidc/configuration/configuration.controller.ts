import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigurationResponse } from './configuration-response';
import { RequestContext } from '@app/shared';

@ApiTags('OIDC')
@Controller('.well-known/openid-configuration')
export class ConfigurationController {
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: '', type: ConfigurationResponse })
  @ApiOperation({ operationId: 'configuration' })
  @HttpCode(200)
  async execute(): Promise<ConfigurationResponse> {
    const hostUrl = RequestContext.fullBaseUrl;

    const config = {
      issuer: `${hostUrl}`,
      authorization_endpoint: `${hostUrl}/protocol/openid-connect/auth`,
      token_endpoint: `${hostUrl}/protocol/openid-connect/token`,
      userinfo_endpoint: `${hostUrl}/protocol/openid-connect/userinfo`,
      jwks_uri: `${hostUrl}/.well-known/jwks.json`,
      end_session_endpoint: `${hostUrl}/protocol/openid-connect/logout`,
      frontchannel_logout_supported: true,
      frontchannel_logout_session_supported: true,
      backchannel_logout_supported: false,
      backchannel_logout_session_supported: false,
      response_types_supported: ['code', 'id_token', 'token id_token'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256'],
      token_endpoint_auth_methods_supported: ['client_secret_basic'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      scopes_supported: ['openid', 'profile', 'email'],
      claim_types_supported: ['normal'],
      claims_supported: ['sub', 'name', 'email', 'preferred_username'],
      code_challenge_methods_supported: ['S256'],
    };

    return config;
  }
}
