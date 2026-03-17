import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, Prisma } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { GetDashboardListRequest } from './get-dashboard-list-request';
import { GetDashboardListResponse } from './get-dashboard-list-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class GetDashboardListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getDashboardList' })
  @ApiResponse({ status: HttpStatus.OK, type: GetDashboardListResponse })
  @Authorize(UserType.MEMBER, UserType.MODRATOR, UserType.DEV, UserType.SUPER_ADMIN)
  async execute(
    @Query() request: GetDashboardListRequest,
  ): Promise<GetDashboardListResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const where: Prisma.DashboardWhereInput = {};
        if (request.search) {
          where.name = { contains: request.search };
        }

        const count = await dbContext.dashboard.count({ where });

        let orderBy: Prisma.DashboardOrderByWithRelationInput = {};
        switch (request.orderByPropertyName) {
          case 'name':
            orderBy = { name: request.sortingDirection };
            break;
          case 'updatedAt':
            orderBy = { updatedAt: request.sortingDirection };
            break;
          default:
            orderBy = { createdAt: request.sortingDirection };
            break;
        }

        const items = await dbContext.dashboard.findMany({
          skip: (request.pageNumber - 1) * request.pageSize,
          take: request.pageSize,
          where,
          orderBy,
        });

        return {
          successMessage: SuccessMessages.getListSuccess('Dashboard'),
          data: items.map((d) => ({
            id: d.id,
            name: d.name,
            description: d.description,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          })),
          pageNumber: request.pageNumber,
          pageSize: request.pageSize,
          totalCount: count,
        };
      },
      { isTransaction: false },
    );
  }
}
