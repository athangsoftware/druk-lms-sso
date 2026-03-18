import {
  Controller,
  Put,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { UpdateChartLayoutRequest } from './update-chart-layout-request';
import { UpdateChartLayoutResponse } from './update-chart-layout-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class UpdateChartLayoutController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':dashboardId/charts/:chartId/layout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateChartLayout' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateChartLayoutResponse })
  @Authorize('user.read')
  async execute(
    @Param('dashboardId') dashboardId: string,
    @Param('chartId') chartId: string,
    @Body() body: UpdateChartLayoutRequest,
  ): Promise<UpdateChartLayoutResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.dashboardChart.findUnique({
        where: { dashboardId_chartId: { dashboardId, chartId } },
      });
      if (!existing) {
        throw new NotFoundException('Chart is not on this dashboard.');
      }

      const updated = await dbContext.dashboardChart.update({
        where: { dashboardId_chartId: { dashboardId, chartId } },
        data: {
          ...(body.positionX !== undefined && { positionX: body.positionX }),
          ...(body.positionY !== undefined && { positionY: body.positionY }),
          ...(body.width !== undefined && { width: body.width }),
          ...(body.height !== undefined && { height: body.height }),
          ...(body.order !== undefined && { order: body.order }),
        },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('Chart layout'),
        data: {
          id: updated.id,
          dashboardId: updated.dashboardId,
          chartId: updated.chartId,
          positionX: updated.positionX,
          positionY: updated.positionY,
          width: updated.width,
          height: updated.height,
          order: updated.order,
        },
      };
    });
  }
}
