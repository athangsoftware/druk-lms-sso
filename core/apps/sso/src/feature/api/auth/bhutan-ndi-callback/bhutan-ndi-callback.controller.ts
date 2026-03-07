import { Controller, Post, Body, HttpCode, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@app/prisma-sso';
import { BhutanNdiCallbackResponse } from './bhutan-ndi-callback-response';

@ApiTags('Ndi')
@ApiBearerAuth()
@Controller('ndi/callback')
export class BhutanNdiCallbackController {
  private readonly logger = new Logger(BhutanNdiCallbackController.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, description: 'Processes Bhutan NDI webhook callback', type: BhutanNdiCallbackResponse })
  @ApiOperation({ operationId: 'bhutanNdiCallback' })
  @HttpCode(200)
  async execute(@Body() payload: any): Promise<void> {
    this.logger.log('Received webhook call', { payload: JSON.stringify(payload, null, 2) });

    const proofRequestId = payload?.thid;
    if (!proofRequestId) {
      throw new HttpException('Missing proofRequestThreadId in payload', HttpStatus.BAD_REQUEST);
    }

    const isProcessed = await this.prismaService.client(async ({ dbContext }) => {
      const existingWebhook = await dbContext.webhookLog.findUnique({ where: { proofRequestId } });
      return !!existingWebhook;
    });

    if (isProcessed) {
      this.logger.warn(`Webhook with proofRequestId: ${proofRequestId} already processed`);
      return;
    }

    const ndiIdentifier = payload?.requested_presentation?.revealed_attrs?.['ID Number']?.[0]?.value;
    const fullName = payload?.requested_presentation?.revealed_attrs?.['Full Name']?.[0]?.value;

    if (!ndiIdentifier) {
      throw new HttpException('NDI identifier missing', HttpStatus.BAD_REQUEST);
    }

    await this.prismaService.client(async ({ dbContext }) => {
      try {
        await dbContext.webhookLog.create({
          data: { proofRequestId, payload: JSON.stringify(payload), processedAt: new Date() },
        });
      } catch (error) {
        if (error.code === 'P2002') return;
        throw error;
      }

      const authCodeRecord = await dbContext.authorizationCode.findUnique({ where: { code: proofRequestId } });
      if (!authCodeRecord || authCodeRecord.isUsed) {
        throw new HttpException('Invalid or expired threadId', HttpStatus.BAD_REQUEST);
      }

      const { clientId: client_id } = authCodeRecord;

      const user = await dbContext.user.findUnique({ where: { ndiIdentifier } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const client = await dbContext.client.findUnique({
        where: { clientId: client_id },
        include: { redirectUrls: true },
      });
      if (!client) {
        throw new HttpException('Invalid client', HttpStatus.BAD_REQUEST);
      }

      await dbContext.authorizationCode.update({
        where: { code: proofRequestId },
        data: {
          userId: user.id,
          isUsed: false,
          updatedBy: 'NDI_SYSTEM',
          updatedAt: new Date(),
          updatedIp: 'N/A',
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      });
    });
  }
}
