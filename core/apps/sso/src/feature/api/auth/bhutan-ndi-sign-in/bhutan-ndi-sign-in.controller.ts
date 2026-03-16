import { Controller, Get, HttpCode, Query, Res, BadRequestException, UseInterceptors, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BhutanNdiService } from '../../bhutan-ndi.service';
import { PrismaService } from '@app/prisma-sso';
import { BhutanNdiSignInRequest } from './bhutan-ndi-sign-in-request';
import { SnakeToCamelInterceptor } from '@app/shared';
import type { Response } from 'express';
import * as crypto from 'crypto';

@ApiTags('Ndi')
@ApiBearerAuth()
@Controller('auth/ndi')
export class BhutanNdiSignInController {
  private readonly logger = new Logger(BhutanNdiSignInController.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly bhutanNdiService: BhutanNdiService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Initiates Bhutan NDI authentication flow' })
  @ApiOperation({ operationId: 'ndiSignIn' })
  @HttpCode(200)
  @UseInterceptors(SnakeToCamelInterceptor)
  async execute(
    @Query() param: BhutanNdiSignInRequest,
    @Res() res: Response,
  ): Promise<any> {
    const { client_id, redirect_uri, code_challenge, code_challenge_method, state } = param;

    if (!client_id || !redirect_uri) {
      throw new BadRequestException('Missing client_id or redirect_uri');
    }

    try {
      const accessToken = await this.bhutanNdiService.authenticate();
      const proofResponse = await this.bhutanNdiService.createProofRequest(accessToken);
      const threadId = proofResponse.data.proofRequestThreadId;

      await this.prismaService.client(async ({ dbContext }) => {
        await dbContext.authorizationCode.create({
          data: {
            code: threadId,
            clientId: client_id,
            redirectUri: redirect_uri,
            codeChallenge: code_challenge,
            codeChallengeMethod: code_challenge_method,
            state: state || crypto.randomUUID(),
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            isUsed: false,
            createdBy: 'NDI_SYSTEM',
          },
        });
      });

      await this.bhutanNdiService.subscribeWebhook(accessToken, threadId, 'WEBHOOK_DEMO_DEV');

      return res.json(proofResponse);
    } catch (error) {
      this.logger.error('NDI authentication initiation failed', error?.message ?? error, error?.stack);
      const message = error?.response?.message ?? error?.message ?? 'Failed to initiate NDI authentication';
      throw new BadRequestException(message);
    }
  }
}
