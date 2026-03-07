import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { CreateDashboardFilterRequest } from './create-dashboard-filter-request';
import { CreateDashboardFilterResponse } from './create-dashboard-filter-response';
import { SuccessMessages } from '../../../../core/models/message';
import { validateQuery } from '../../../../core/utils/query-validator.util';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class CreateDashboardFilterController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post(':id/filters')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createDashboardFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateDashboardFilterResponse })
  @Authorize(Role.MEMBER)
  async execute(
    @Param('id') dashboardId: string,
    @Body() body: CreateDashboardFilterRequest,
  ): Promise<CreateDashboardFilterResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const dashboard = await dbContext.dashboard.findUnique({
        where: { id: dashboardId },
      });
      if (!dashboard) {
        throw new NotFoundException('Dashboard not found.');
      }

      if (body.sourceQuery) {
        try {
          validateQuery(body.sourceQuery);
        } catch (err: any) {
          throw new BadRequestException(
            `Source query is invalid: ${err.message}`,
          );
        }
      }

      if (
        (body.filterType === 'MULTI_SELECT' || body.filterType === 'SINGLE_SELECT') &&
        !body.sourceQuery
      ) {
        throw new BadRequestException(
          'sourceQuery is required for MULTI_SELECT and SINGLE_SELECT filter types.',
        );
      }

      const count = await dbContext.dashboardFilter.count({
        where: { dashboardId },
      });

      const filter = await dbContext.dashboardFilter.create({
        data: {
          dashboardId,
          name: body.name,
          filterType: body.filterType,
          connectionId: body.connectionId ?? null,
          targetColumn: body.targetColumn,
          sourceQuery: body.sourceQuery ?? null,
          defaultValue: body.defaultValue ?? null,
          order: body.order ?? count,
        },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Dashboard filter'),
        data: {
          id: filter.id,
          dashboardId: filter.dashboardId,
          name: filter.name,
          filterType: filter.filterType,
          connectionId: filter.connectionId,
          targetColumn: filter.targetColumn,
          sourceQuery: filter.sourceQuery,
          defaultValue: filter.defaultValue,
          order: filter.order,
          createdAt: filter.createdAt,
        },
      };
    });
  }
}
