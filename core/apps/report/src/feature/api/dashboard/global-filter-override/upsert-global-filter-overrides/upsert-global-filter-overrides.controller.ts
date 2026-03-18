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
import { GlobalFilterOverrideItemRequest } from './upsert-global-filter-overrides-request';
import { UpsertGlobalFilterOverridesResponse, GlobalFilterOverrideData } from './upsert-global-filter-overrides-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('Dashboard Global Filter Overrides')
@ApiBearerAuth()
@Controller('/dashboards')
export class UpsertGlobalFilterOverridesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id/global-filter-overrides')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'upsertGlobalFilterOverrides' })
  @ApiResponse({ status: HttpStatus.OK, type: UpsertGlobalFilterOverridesResponse })
  @Authorize('user.read')
  async execute(
    @Param('id') dashboardId: string,
    @Body() body: GlobalFilterOverrideItemRequest[],
  ): Promise<UpsertGlobalFilterOverridesResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const dashboard = await dbContext.dashboard.findUnique({ where: { id: dashboardId } });
      if (!dashboard) {
        throw new NotFoundException('Dashboard not found.');
      }

      const results: GlobalFilterOverrideData[] = [];
      for (const item of body) {
        const globalFilter = await dbContext.globalFilter.findUnique({
          where: { id: item.globalFilterId },
        });
        if (!globalFilter) {
          throw new NotFoundException(`Global filter "${item.globalFilterId}" not found.`);
        }

        const override = await dbContext.globalFilterOverride.upsert({
          where: {
            globalFilterId_dashboardId: {
              globalFilterId: item.globalFilterId,
              dashboardId,
            },
          },
          create: {
            globalFilterId: item.globalFilterId,
            dashboardId,
            isDisabled: item.isDisabled ?? false,
            columnValue: item.columnValue ?? null,
            missingColumnBehavior: item.missingColumnBehavior ?? null,
          },
          update: {
            isDisabled: item.isDisabled ?? false,
            columnValue: item.columnValue ?? null,
            missingColumnBehavior: item.missingColumnBehavior ?? null,
          },
        });

        results.push({
          id: override.id,
          globalFilterId: override.globalFilterId,
          dashboardId: override.dashboardId,
          isDisabled: override.isDisabled,
          columnValue: override.columnValue,
          missingColumnBehavior: override.missingColumnBehavior,
        });
      }

      return {
        successMessage: SuccessMessages.updateSuccess('Global filter override'),
        data: results,
      };
    });
  }
}
