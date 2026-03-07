/* eslint-disable @typescript-eslint/naming-convention */
import { Controller, Get, Query, Req, Res, HttpStatus, HttpCode, BadRequestException, Inject } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizeRequest } from './authorize-request';
import { AuthorizeResponse } from './authorize-response';
import { PrismaService } from '@app/prisma-sso';
import appConfig, { type AppConfig } from '../../../../config';

@ApiTags('OIDC')
@Controller('protocol/openid-connect/auth')
export class AuthorizeController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(appConfig.KEY) private readonly appConfig: AppConfig,
  ) {}
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: '', type: AuthorizeResponse })
  @ApiOperation({ operationId: 'authorize' })
  @HttpCode(200)
  async execute(
    @Query() param: AuthorizeRequest,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { client_id, redirect_uri, code_challenge, code_challenge_method, state } = param;
    const userId = req.session.userId;

    if (!userId) {
      const loginUrl = new URL(this.appConfig.ssoLoginUrl ?? '');
      loginUrl.searchParams.set('client_id', client_id);
      loginUrl.searchParams.set('redirect_uri', redirect_uri);
      loginUrl.searchParams.set('code_challenge', code_challenge ?? '');
      loginUrl.searchParams.set('code_challenge_method', code_challenge_method ?? '');
      if (state) loginUrl.searchParams.set('state', state);

      return res.redirect(loginUrl.toString());
    }

    return await this.prismaService.client(async ({ dbContext }) => {
      const client = await dbContext.client.findUnique({
        where: { clientId: client_id },
        include: { redirectUrls: true },
      });

      if (!client) {
        throw new BadRequestException('Invalid client_id');
      }

      if (!client.disableStrictUrlValidation) {
        const isValidRedirectUri = client.redirectUrls.some((url: { url: string }) => url.url === redirect_uri);
        if (!isValidRedirectUri) {
          throw new BadRequestException('Invalid redirect_uri: not registered for this client');
        }
      }

      const code = crypto.randomUUID();
      await dbContext.authorizationCode.create({
        data: {
          code,
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
      redirectUrl.searchParams.set('code', code);
      if (state) redirectUrl.searchParams.set('state', state);

      res.redirect(redirectUrl.toString());
    });
  }
}
