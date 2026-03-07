import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, Prisma } from '@app/prisma-report';
import { Role } from '@app/shared';
import { GetChartListRequest } from './get-chart-list-request';
import { GetChartListResponse } from './get-chart-list-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Charts')
@ApiBearerAuth()
@Controller('/charts')
export class GetChartListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getChartList' })
  @ApiResponse({ status: HttpStatus.OK, type: GetChartListResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Query() request: GetChartListRequest,
  ): Promise<GetChartListResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const where: Prisma.ChartWhereInput = {};

        if (request.search) {
          where.OR = [{ name: { contains: request.search } }];
        }
        if (request.connectionId) {
          where.connectionId = request.connectionId;
        }

        let orderBy: Prisma.ChartOrderByWithRelationInput = {};
        switch (request.orderByPropertyName) {
          case 'name':
            orderBy = { name: request.sortingDirection };
            break;
          default:
            orderBy = { createdAt: 'desc' };
            break;
        }

        const count = await dbContext.chart.count({ where });
        const items = await dbContext.chart.findMany({
          skip: (request.pageNumber - 1) * request.pageSize,
          take: request.pageSize,
          where,
          orderBy,
          include: { connection: true },
        });

        return {
          successMessage: SuccessMessages.getListSuccess('Chart'),
          data: items.map((c) => ({
            id: c.id,
            name: c.name,
            connectionId: c.connectionId,
            connectionName: c.connection.name,
            sqlQuery: c.sqlQuery,
            chartType: c.chartType,
            chartConfig: c.chartConfig as Record<string, unknown>,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
          })),
          pageNumber: request.pageNumber,
          pageSize: request.pageSize,
          totalCount: count,
          orderByPropertyName: request.orderByPropertyName || 'createdAt',
          sortingDirection: request.sortingDirection,
        };
      },
      { isTransaction: false },
    );
  }
}
