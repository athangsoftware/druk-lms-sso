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
import { UserType } from '@app/shared';
import { ListGlobalFilterOverridesResponse } from './list-global-filter-overrides-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('Dashboard Global Filter Overrides')
@ApiBearerAuth()
@Controller('/dashboards')
export class ListGlobalFilterOverridesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id/global-filter-overrides')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'listGlobalFilterOverrides' })
  @ApiResponse({ status: HttpStatus.OK, type: ListGlobalFilterOverridesResponse })
  @Authorize(UserType.MEMBER, UserType.MODRATOR, UserType.DEV, UserType.SUPER_ADMIN)
  async execute(
    @Param('id') dashboardId: string,
  ): Promise<ListGlobalFilterOverridesResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const dashboard = await dbContext.dashboard.findUnique({ where: { id: dashboardId } });
        if (!dashboard) {
          throw new NotFoundException('Dashboard not found.');
        }

        const overrides = await dbContext.globalFilterOverride.findMany({
          where: { dashboardId },
        });

        return {
          successMessage: SuccessMessages.getListSuccess('Global filter override'),
          data: overrides.map((o) => ({
            id: o.id,
            globalFilterId: o.globalFilterId,
            dashboardId: o.dashboardId,
            isDisabled: o.isDisabled,
            columnValue: o.columnValue,
            missingColumnBehavior: o.missingColumnBehavior,
          })),
        };
      },
      { isTransaction: false },
    );
  }
}
