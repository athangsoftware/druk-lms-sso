import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, Prisma } from '@app/prisma-report';
import { Role } from '@app/shared';
import { GetDbConnectionListRequest } from './get-db-connection-list-request';
import { GetDbConnectionListResponse } from './get-db-connection-list-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('DB Connections')
@ApiBearerAuth()
@Controller('/db-connections')
export class GetDbConnectionListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getDbConnectionList' })
  @ApiResponse({ status: HttpStatus.OK, type: GetDbConnectionListResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Query() request: GetDbConnectionListRequest,
  ): Promise<GetDbConnectionListResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const where: Prisma.DbConnectionWhereInput = {};

        if (request.search) {
          where.OR = [
            { name: { contains: request.search } },
            { host: { contains: request.search } },
            { databaseName: { contains: request.search } },
          ];
        }

        let orderBy: Prisma.DbConnectionOrderByWithRelationInput = {};
        switch (request.orderByPropertyName) {
          case 'name':
            orderBy = { name: request.sortingDirection };
            break;
          case 'host':
            orderBy = { host: request.sortingDirection };
            break;
          case 'createdAt':
            orderBy = { createdAt: request.sortingDirection };
            break;
          default:
            orderBy = { createdAt: 'desc' };
            break;
        }

        const count = await dbContext.dbConnection.count({ where });
        const items = await dbContext.dbConnection.findMany({
          skip: (request.pageNumber - 1) * request.pageSize,
          take: request.pageSize,
          where,
          orderBy,
        });

        return {
          successMessage: SuccessMessages.getListSuccess('DB connection'),
          data: items.map((c) => ({
            id: c.id,
            name: c.name,
            dbType: c.dbType,
            host: c.host,
            port: c.port,
            databaseName: c.databaseName,
            username: c.username,
            createdAt: c.createdAt,
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
