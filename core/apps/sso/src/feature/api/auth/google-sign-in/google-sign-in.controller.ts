import {
  Controller, HttpCode, HttpStatus, Res, Req, Inject, UseInterceptors, Get, Query,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SnakeToCamelInterceptor } from '@app/shared';
import { GoogleSignInRequest } from './google-sign-in-request';
import appConfig, { type AppConfig } from '../../../../config';

@ApiTags('Auth')
@Controller('auth')
export class GoogleSignInController {
  constructor(
    @Inject(appConfig.KEY) private readonly appConfig: AppConfig,
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

    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id', this.appConfig.googleClientId);
    googleAuthUrl.searchParams.set('redirect_uri', this.appConfig.redirectUri);
    googleAuthUrl.searchParams.set('response_type', 'code');
    googleAuthUrl.searchParams.set('scope', 'openid profile email');
    if (state) {
      googleAuthUrl.searchParams.set('state', state);
    }

    return res.redirect(googleAuthUrl.toString());
  }
}
