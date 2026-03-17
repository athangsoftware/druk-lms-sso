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
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { DeleteDashboardFilterResponse } from './delete-dashboard-filter-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('Dashboard Filters')
@ApiBearerAuth()
@Controller('/dashboards')
export class DeleteDashboardFilterController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':id/filters/:filterId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteDashboardFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteDashboardFilterResponse })
  @Authorize(UserType.MEMBER, UserType.MODRATOR, UserType.DEV, UserType.SUPER_ADMIN)
  async execute(
    @Param('id') dashboardId: string,
    @Param('filterId') filterId: string,
  ): Promise<DeleteDashboardFilterResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.dashboardFilter.findFirst({
        where: { id: filterId, dashboardId },
      });
      if (!existing) {
        throw new NotFoundException('Dashboard filter not found.');
      }

      await dbContext.dashboardFilter.delete({ where: { id: filterId } });

      return {
        successMessage: SuccessMessages.deleteSuccess('Dashboard filter'),
      };
    });
  }
}
