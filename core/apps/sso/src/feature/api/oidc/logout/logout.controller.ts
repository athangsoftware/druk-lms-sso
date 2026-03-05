import { Controller, Get, Query, Req, Res, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('OIDC')
@Controller('protocol/openid-connect/logout')
export class LogoutController {
  @Get()
  @ApiOperation({ operationId: 'logout' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Logs out the user' })
  async execute(
    @Req() req: Request,
    @Res() res: Response,
    @Query('post_logout_redirect_uri') postLogoutRedirectUri?: string,
    @Query('id_token_hint') idTokenHint?: string,
  ): Promise<void> {
    if (req.session) {
      await new Promise<void>((resolve) => {
        req.session.destroy(() => resolve());
      });
    }

    res.clearCookie('connect.sid');

    if (postLogoutRedirectUri) {
      const url = new URL(postLogoutRedirectUri);
      return res.redirect(url.toString());
    }

    res.json({ message: 'Logged out successfully' });
  }
}
