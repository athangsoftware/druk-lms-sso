import {
  Controller, HttpCode, HttpStatus, Res, Req, Inject, UseInterceptors, Get, Query, BadRequestException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SnakeToCamelInterceptor } from '@app/shared';
import { GoogleSignInRequest } from './google-sign-in-request';
import appConfig, { type AppConfig } from '../../../../config';
import { IdentityProviderService } from '../../identity-provider.service';

@ApiTags('Auth')
@Controller('auth')
export class GoogleSignInController {
  constructor(
    @Inject(appConfig.KEY) private readonly appConfig: AppConfig,
    private readonly idpService: IdentityProviderService,
  ) {}

  @Get('google')
  @ApiResponse({ status: HttpStatus.OK, description: '' })
  @ApiOperation({ operationId: 'googleSignIn' })
  @HttpCode(200)
  @UseInterceptors(SnakeToCamelInterceptor)
  async execute(
    @Query() param: GoogleSignInRequest,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any | void> {
    const { client_id, redirect_uri, code_challenge, code_challenge_method, state } = param;

    req.session.authParams = { client_id, redirect_uri, code_challenge, code_challenge_method, state };

    // Load Google provider config from DB, fall back to env vars
    const provider = await this.idpService.getProviderBySlug('google');

    const googleClientId = provider?.isEnabled ? provider.clientId : this.appConfig.googleClientId;
    const googleRedirectUri = this.appConfig.redirectUri || (provider?.isEnabled ? provider.redirectUrl : null);
    const authorizationUrl = provider?.isEnabled && provider.authorizationUrl
      ? provider.authorizationUrl
      : 'https://accounts.google.com/o/oauth2/v2/auth';
    const scopes = provider?.isEnabled && provider.scopes ? provider.scopes : 'openid profile email';

    if (!googleClientId) {
      throw new BadRequestException('Google authentication is not configured');
    }

    const googleAuthUrl = new URL(authorizationUrl);
    googleAuthUrl.searchParams.set('client_id', googleClientId);
    googleAuthUrl.searchParams.set('redirect_uri', googleRedirectUri);
    googleAuthUrl.searchParams.set('response_type', 'code');
    googleAuthUrl.searchParams.set('scope', scopes);
    if (state) {
      googleAuthUrl.searchParams.set('state', state);
    }

    return res.redirect(googleAuthUrl.toString());
  }
}
