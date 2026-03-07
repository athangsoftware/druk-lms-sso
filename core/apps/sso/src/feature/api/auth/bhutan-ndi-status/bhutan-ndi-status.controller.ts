import { Controller, Get, Query, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@app/prisma-sso';
import appConfig, { type AppConfig } from '../../../../config';

@ApiTags('Ndi')
@Controller('ndi')
export class NdiStatusController {
  private readonly logger = new Logger(NdiStatusController.name);

  constructor(
    private readonly prismaService: PrismaService,
    @Inject(appConfig.KEY) private readonly appConfig: AppConfig,
  ) {}

  @Get('status')
  @ApiOperation({ operationId: 'getNdiStatus', summary: 'Check status of NDI authentication' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns status and optional redirect URL', type: Object })
  async getStatus(@Query('threadId') threadId: string) {
    if (!threadId) {
      throw new HttpException('Missing threadId', HttpStatus.BAD_REQUEST);
    }

    const authCodeRecord = await this.prismaService.client(async ({ dbContext }) => {
      return dbContext.authorizationCode.findUnique({ where: { code: threadId } });
    });

    if (!authCodeRecord || authCodeRecord.isUsed) {
      throw new HttpException('Invalid or expired threadId', HttpStatus.BAD_REQUEST);
    }

    if (!authCodeRecord.userId) {
      return { status: 'pending' };
    }

    const client = await this.prismaService.client(async ({ dbContext }) => {
      return dbContext.client.findUnique({ where: { clientId: authCodeRecord.clientId } });
    });

    if (!client) {
      throw new HttpException('Invalid client', HttpStatus.BAD_REQUEST);
    }

    const redirectUrl = this.appConfig.ssoCallbackUrl;
    const state = authCodeRecord.state || crypto.randomUUID();
    const redirectUrlWithParams = `${redirectUrl}?code=${threadId}&state=${state}`;

    return { status: 'completed', redirectUrl: redirectUrlWithParams };
  }
}
