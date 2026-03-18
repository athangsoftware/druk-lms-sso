import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { RemoveChartFromDashboardResponse } from './remove-chart-from-dashboard-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class RemoveChartFromDashboardController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':dashboardId/charts/:chartId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'removeChartFromDashboard' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveChartFromDashboardResponse })
  @Authorize('user.read')
  async execute(
    @Param('dashboardId') dashboardId: string,
    @Param('chartId') chartId: string,
  ): Promise<RemoveChartFromDashboardResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.dashboardChart.findUnique({
        where: { dashboardId_chartId: { dashboardId, chartId } },
      });
      if (!existing) {
        throw new NotFoundException('Chart is not on this dashboard.');
      }

      await dbContext.dashboardChart.delete({
        where: { dashboardId_chartId: { dashboardId, chartId } },
      });

      return {
        successMessage: SuccessMessages.deleteSuccess('Chart from dashboard'),
      };
    });
  }
}
