import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { AddChartToDashboardRequest } from './add-chart-to-dashboard-request';
import { AddChartToDashboardResponse } from './add-chart-to-dashboard-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class AddChartToDashboardController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post(':id/charts')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'addChartToDashboard' })
  @ApiResponse({ status: HttpStatus.OK, type: AddChartToDashboardResponse })
  @Authorize(Role.MEMBER)
  async execute(
    @Param('id') dashboardId: string,
    @Body() body: AddChartToDashboardRequest,
  ): Promise<AddChartToDashboardResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const dashboard = await dbContext.dashboard.findUnique({
        where: { id: dashboardId },
      });
      if (!dashboard) {
        throw new NotFoundException('Dashboard not found.');
      }

      const chart = await dbContext.chart.findUnique({
        where: { id: body.chartId },
      });
      if (!chart) {
        throw new NotFoundException('Chart not found.');
      }

      const existing = await dbContext.dashboardChart.findUnique({
        where: { dashboardId_chartId: { dashboardId, chartId: body.chartId } },
      });
      if (existing) {
        throw new HttpException(
          'Chart is already added to this dashboard.',
          HttpStatus.CONFLICT,
        );
      }

      const count = await dbContext.dashboardChart.count({
        where: { dashboardId },
      });

      const dashboardChart = await dbContext.dashboardChart.create({
        data: {
          dashboardId,
          chartId: body.chartId,
          positionX: body.positionX ?? 0,
          positionY: body.positionY ?? 0,
          width: body.width ?? 6,
          height: body.height ?? 4,
          order: count,
        },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Chart on dashboard'),
        data: {
          id: dashboardChart.id,
          dashboardId: dashboardChart.dashboardId,
          chartId: dashboardChart.chartId,
          positionX: dashboardChart.positionX,
          positionY: dashboardChart.positionY,
          width: dashboardChart.width,
          height: dashboardChart.height,
          order: dashboardChart.order,
        },
      };
    });
  }
}
