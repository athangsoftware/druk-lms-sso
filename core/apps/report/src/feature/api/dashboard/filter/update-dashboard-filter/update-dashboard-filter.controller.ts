import {
  Controller,
  Put,
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
import { UpdateDashboardFilterRequest } from './update-dashboard-filter-request';
import { UpdateDashboardFilterResponse } from './update-dashboard-filter-response';
import { SuccessMessages } from '../../../../../core/models/message';
import { validateColumnName } from '../../../../../core/utils/filter.util';
import { validateQuery } from '../../../../../core/utils/query-validator.util';

@ApiTags('Dashboard Filters')
@ApiBearerAuth()
@Controller('/dashboards')
export class UpdateDashboardFilterController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id/filters/:filterId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateDashboardFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateDashboardFilterResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Param('id') dashboardId: string,
    @Param('filterId') filterId: string,
    @Body() body: UpdateDashboardFilterRequest,
  ): Promise<UpdateDashboardFilterResponse> {
    if (body.targetColumn) {
      try {
        validateColumnName(body.targetColumn);
      } catch {
        throw new BadRequestException('Invalid target column name.');
      }
    }

    if (body.sourceQuery) {
      try {
        validateQuery(body.sourceQuery);
      } catch (error: any) {
        throw new BadRequestException(`Invalid source query: ${error.message}`);
      }
    }

    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.dashboardFilter.findFirst({
        where: { id: filterId, dashboardId },
      });
      if (!existing) {
        throw new NotFoundException('Dashboard filter not found.');
      }

      if (body.connectionId) {
        const connection = await dbContext.dbConnection.findUnique({
          where: { id: body.connectionId },
        });
        if (!connection) {
          throw new NotFoundException('Database connection not found.');
        }
      }

      await dbContext.dashboardFilter.update({
        where: { id: filterId },
        data: {
          ...(body.name !== undefined && { name: body.name }),
          ...(body.filterType !== undefined && { filterType: body.filterType }),
          ...(body.connectionId !== undefined && { connectionId: body.connectionId }),
          ...(body.targetColumn !== undefined && { targetColumn: body.targetColumn }),
          ...(body.sourceQuery !== undefined && { sourceQuery: body.sourceQuery }),
          ...(body.defaultValue !== undefined && { defaultValue: body.defaultValue }),
          ...(body.order !== undefined && { order: body.order }),
        },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('Dashboard filter'),
      };
    });
  }
}
