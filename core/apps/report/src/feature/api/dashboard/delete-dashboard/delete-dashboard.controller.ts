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
import { DeleteDashboardResponse } from './delete-dashboard-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class DeleteDashboardController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteDashboard' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteDashboardResponse })
  @Authorize(Role.MEMBER)
  async execute(@Param('id') id: string): Promise<DeleteDashboardResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.dashboard.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Dashboard not found.');
      }

      // DashboardChart rows removed by cascade
      await dbContext.dashboard.delete({ where: { id } });

      return { successMessage: SuccessMessages.deleteSuccess('Dashboard') };
    });
  }
}
