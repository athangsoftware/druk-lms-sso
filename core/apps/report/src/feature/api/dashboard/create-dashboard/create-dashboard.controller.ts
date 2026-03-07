import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { CreateDashboardRequest } from './create-dashboard-request';
import { CreateDashboardResponse } from './create-dashboard-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class CreateDashboardController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createDashboard' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateDashboardResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Body() body: CreateDashboardRequest,
  ): Promise<CreateDashboardResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const dashboard = await dbContext.dashboard.create({
        data: { name: body.name, description: body.description },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Dashboard'),
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
