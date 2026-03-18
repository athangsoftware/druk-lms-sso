import { RequirePermission } from '../../rbac';
import { Controller, Get, HttpCode, HttpStatus, Logger, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService, UserType } from '@app/prisma-sso';

@ApiTags('Identity Provider')
@ApiBearerAuth()
@Controller('/identity-providers/ndi')
export class NdiWebhookStatusController {
  private readonly logger = new Logger(NdiWebhookStatusController.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Get('webhook-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'ndiWebhookStatus' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns NDI webhook status and recent logs' })
  @RequirePermission('identity-provider.list')
  async execute(
    @Query('limit') limit?: string,
  ): Promise<{
    successMessage: string;
    data: {
      totalWebhookLogs: number;
      recentLogs: { id: string; proofRequestId: string; processedAt: string; createdAt: string }[];
    };
  }> {
    const take = Math.min(Number(limit) || 10, 50);

    return await this.prismaService.client(async ({ dbContext }) => {
      const [totalWebhookLogs, recentLogs] = await Promise.all([
        dbContext.webhookLog.count(),
        dbContext.webhookLog.findMany({
          take,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            proofRequestId: true,
            processedAt: true,
            createdAt: true,
          },
        }),
      ]);

      return {
        successMessage: 'NDI webhook status retrieved successfully',
        data: {
          totalWebhookLogs,
          recentLogs: recentLogs.map((log) => ({
            id: log.id,
            proofRequestId: log.proofRequestId,
            processedAt: log.processedAt.toISOString(),
            createdAt: log.createdAt.toISOString(),
          })),
        },
      };
    });
  }
}
