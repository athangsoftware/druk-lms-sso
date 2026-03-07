import {
  Controller, Res, Req, Inject, Get, Query, BadRequestException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@app/prisma-sso';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { HttpService } from '@nestjs/axios';
import * as crypto from 'crypto';
import appConfig, { type AppConfig } from '../../../../config';

@ApiTags('Auth')
@Controller('auth')
export class GoogleSignInCallbackController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    @Inject(appConfig.KEY) private readonly appConfig: AppConfig,
  ) {}

  @Get('google/callback')
  @ApiOperation({ operationId: 'googleCallback' })
  async handleGoogleCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!code) {
      throw new BadRequestException('Missing authorization code');
    }

    const oidcParams = req.session.authParams;
    if (!oidcParams) {
      throw new BadRequestException('Missing OIDC session data');
    }

    const tokenResponse = await firstValueFrom(
      this.httpService.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: this.appConfig.googleClientId,
        client_secret: this.appConfig.googleClientSecret,
        redirect_uri: this.appConfig.redirectUri,
        grant_type: 'authorization_code',
      }),
    );

    const { access_token } = tokenResponse.data;

    const userInfoResponse = await firstValueFrom(
      this.httpService.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
      }),
    );
    const userInfo = userInfoResponse.data;
    const { sub: googleId, email, name } = userInfo;

    const redirectUrl = await this.prismaService.client(async ({ dbContext }) => {
      let user = await dbContext.user.findFirst({ where: { email } });
      if (!user) {
        throw new BadRequestException('User not authenticated');
      }

      req.session.userId = user.id;

      const { client_id, redirect_uri, code_challenge, code_challenge_method } = oidcParams;
      const userId = req.session.userId;

      if (!userId) {
        throw new BadRequestException('User not authenticated');
      }

      const client = await dbContext.client.findUnique({
        where: { clientId: client_id },
        include: { redirectUrls: true },
      });

      if (!client) {
        throw new BadRequestException('Invalid client or redirect_uri');
      }

      const authCode = crypto.randomUUID();
      await dbContext.authorizationCode.create({
        data: {
          code: authCode,
          clientId: client.id,
          userId,
          redirectUri: redirect_uri,
          codeChallenge: code_challenge,
          codeChallengeMethod: code_challenge_method,
          state,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      });

      const redirectUrl = new URL(redirect_uri);
      redirectUrl.searchParams.set('code', authCode);
      if (state) {
        redirectUrl.searchParams.set('state', state);
      }

      return redirectUrl.toString();
    });

    res.redirect(redirectUrl);
  }
}
