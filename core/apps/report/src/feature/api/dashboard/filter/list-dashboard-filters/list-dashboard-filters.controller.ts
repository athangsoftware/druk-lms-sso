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
import { PrismaService } from '@app/prisma-report';
import { Role } from '@app/shared';
import { ListDashboardFiltersResponse } from './list-dashboard-filters-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('Dashboard Filters')
@ApiBearerAuth()
@Controller('/dashboards')
export class ListDashboardFiltersController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id/filters')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'listDashboardFilters' })
  @ApiResponse({ status: HttpStatus.OK, type: ListDashboardFiltersResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Param('id') dashboardId: string,
  ): Promise<ListDashboardFiltersResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const dashboard = await dbContext.dashboard.findUnique({
          where: { id: dashboardId },
        });
        if (!dashboard) {
          throw new NotFoundException('Dashboard not found.');
        }

        const filters = await dbContext.dashboardFilter.findMany({
          where: { dashboardId },
          orderBy: { order: 'asc' },
        });

        return {
          successMessage: SuccessMessages.getListSuccess('Dashboard filter'),
          data: filters.map((f) => ({
            id: f.id,
            dashboardId: f.dashboardId,
            name: f.name,
            filterType: f.filterType,
            connectionId: f.connectionId,
            targetColumn: f.targetColumn,
            sourceQuery: f.sourceQuery,
            defaultValue: f.defaultValue,
            order: f.order,
            createdAt: f.createdAt,
            updatedAt: f.updatedAt,
          })),
        };
      },
      { isTransaction: false },
    );
  }
}
