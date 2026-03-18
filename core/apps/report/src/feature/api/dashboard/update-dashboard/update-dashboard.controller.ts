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
import { UpdateDashboardRequest } from './update-dashboard-request';
import { UpdateDashboardResponse } from './update-dashboard-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class UpdateDashboardController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateDashboard' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateDashboardResponse })
  @Authorize('user.read')
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateDashboardRequest,
  ): Promise<UpdateDashboardResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.dashboard.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Dashboard not found.');
      }

      const dashboard = await dbContext.dashboard.update({
        where: { id },
        data: {
          ...(body.name !== undefined && { name: body.name }),
          ...(body.description !== undefined && { description: body.description }),
        },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('Dashboard'),
        data: {
          id: dashboard.id,
          name: dashboard.name,
          description: dashboard.description,
          createdAt: dashboard.createdAt,
          updatedAt: dashboard.updatedAt,
        },
      };
    });
  }
}
