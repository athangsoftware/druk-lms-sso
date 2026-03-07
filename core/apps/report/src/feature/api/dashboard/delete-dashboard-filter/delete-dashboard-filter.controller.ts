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
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { DeleteDashboardFilterResponse } from './delete-dashboard-filter-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class DeleteDashboardFilterController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':dashboardId/filters/:filterId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteDashboardFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteDashboardFilterResponse })
  @Authorize(Role.MEMBER)
  async execute(
    @Param('dashboardId') dashboardId: string,
    @Param('filterId') filterId: string,
  ): Promise<DeleteDashboardFilterResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const filter = await dbContext.dashboardFilter.findFirst({
        where: { id: filterId, dashboardId },
      });
      if (!filter) {
        throw new NotFoundException('Dashboard filter not found.');
      }

      await dbContext.dashboardFilter.delete({ where: { id: filterId } });

      return {
        successMessage: SuccessMessages.deleteSuccess('Dashboard filter'),
      };
    });
  }
}
