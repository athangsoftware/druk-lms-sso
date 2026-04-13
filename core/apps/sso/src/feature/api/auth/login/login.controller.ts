import {
  Controller, Post, HttpCode, HttpStatus, Body, Res, Req,
  UnauthorizedException, UseInterceptors, Get,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { PrismaService } from '@app/prisma-sso';
import { BcryptService, SnakeToCamelInterceptor, RequestContext, AuthService } from '@app/shared';

@ApiTags('Auth')
@Controller('auth')
export class LoginController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, description: '', type: LoginResponse })
  @ApiOperation({ operationId: 'login' })
  @HttpCode(200)
  @UseInterceptors(SnakeToCamelInterceptor)
  async execute(
    @Body() body: LoginRequest,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<LoginResponse | void> {
    const { username, password, clientId, redirectUri, codeChallenge, codeChallengeMethod, scope, state } = body;
    const hostUrl = RequestContext.fullBaseUrl;

    return await this.prismaService.client(async ({ dbContext }) => {
      const user = await dbContext.user.findUnique({ where: { username } });

      if (!user || !user.password || !(await this.bcryptService.comparePassword(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      req.session.userId = user.id;

      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) { reject(err); } else { resolve(); }
        });
      });

      const authUrl = new URL(`${hostUrl}/protocol/openid-connect/auth`);
      authUrl.searchParams.set('client_id', clientId);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('code_challenge', codeChallenge);
      authUrl.searchParams.set('code_challenge_method', codeChallengeMethod);
      if (scope) authUrl.searchParams.set('scope', scope);
      if (state) authUrl.searchParams.set('state', state);

      res.json({ redirectUrl: authUrl.toString() });
    });
  }

  @Get('test-session')
  testSession(@Req() req: Request, @Res() res: Response) {
    if (!req.session.views) req.session.views = 1;
    else req.session.views++;
    res.json({ views: req.session.views });
  }
}
