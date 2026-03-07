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
import { SuccessMessages } from '../../../../core/models/message';
import { validateQuery } from '../../../../core/utils/query-validator.util';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class UpdateDashboardFilterController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':dashboardId/filters/:filterId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateDashboardFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateDashboardFilterResponse })
  @Authorize(Role.MEMBER)
  async execute(
    @Param('dashboardId') dashboardId: string,
    @Param('filterId') filterId: string,
    @Body() body: UpdateDashboardFilterRequest,
  ): Promise<UpdateDashboardFilterResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const filter = await dbContext.dashboardFilter.findFirst({
        where: { id: filterId, dashboardId },
      });
      if (!filter) {
        throw new NotFoundException('Dashboard filter not found.');
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
