import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { GetDashboardResponse } from './get-dashboard-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class GetDashboardController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getDashboard' })
  @ApiResponse({ status: HttpStatus.OK, type: GetDashboardResponse })
  @Authorize(Role.MEMBER)
  async execute(@Param('id') id: string): Promise<GetDashboardResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const dashboard = await dbContext.dashboard.findUnique({
          where: { id },
          include: {
            dashboardCharts: {
              include: { chart: { include: { connection: true } } },
              orderBy: { order: 'asc' },
            },
          },
        });

        if (!dashboard) {
          throw new NotFoundException('Dashboard not found.');
        }

        return {
          successMessage: SuccessMessages.getSuccess('Dashboard'),
          data: {
            id: dashboard.id,
            name: dashboard.name,
            description: dashboard.description,
            createdAt: dashboard.createdAt,
            updatedAt: dashboard.updatedAt,
            charts: dashboard.dashboardCharts.map((dc) => ({
              dashboardChartId: dc.id,
              chartId: dc.chartId,
              chartName: dc.chart.name,
              chartType: dc.chart.chartType,
              chartConfig: dc.chart.chartConfig as Record<string, unknown>,
              sqlQuery: dc.chart.sqlQuery,
              connectionId: dc.chart.connectionId,
              connectionName: dc.chart.connection.name,
              positionX: dc.positionX,
              positionY: dc.positionY,
              width: dc.width,
              height: dc.height,
              order: dc.order,
            })),
          },
        };
      },
      { isTransaction: false },
    );
  }
}
