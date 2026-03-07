import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, Prisma, Role } from '@app/prisma';
import { GetClientListRequest } from './get-client-list-request';
import { GetClientListResponse } from './get-client-list-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('/clients')
export class GetClientListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getClientList' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetClientListResponse })
  @Authorize(Role.MODRATOR)
  async execute(@Query() request: GetClientListRequest): Promise<GetClientListResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const whereCondition: Prisma.ClientWhereInput = { AND: [] };

      if (request.search) {
        whereCondition.OR = [
          { name: { contains: request.search } },
          { clientId: { contains: request.search } },
        ];
      }

      if (request.nameValue) {
        (whereCondition.AND as Prisma.ClientWhereInput[]).push({
          name: { [request.nameOperation === 'exact' ? 'equals' : 'contains']: request.nameValue },
        });
      }

      if (request.clientIdValue) {
        (whereCondition.AND as Prisma.ClientWhereInput[]).push({
          clientId: { [request.clientIdOperation === 'exact' ? 'equals' : 'contains']: request.clientIdValue },
        });
      }

      if (request.clientTypeValue) {
        (whereCondition.AND as Prisma.ClientWhereInput[]).push({
          clientType: { equals: request.clientTypeValue as any },
        });
      }

      let orderByCondition: Prisma.ClientOrderByWithRelationInput = {};
      switch (request.orderByPropertyName) {
        case 'name': orderByCondition = { name: request.sortingDirection }; break;
        case 'clientId': orderByCondition = { clientId: request.sortingDirection }; break;
        case 'clientType': orderByCondition = { clientType: request.sortingDirection }; break;
        case 'createdDate': orderByCondition = { createdAt: request.sortingDirection }; break;
        default: orderByCondition = { createdAt: 'desc' }; break;
      }

      const count = await dbContext.client.count({ where: whereCondition });
      const items = await dbContext.client.findMany({
        skip: (request.pageNumber - 1) * request.pageSize,
        take: request.pageSize,
        where: whereCondition,
        orderBy: orderByCondition,
        include: {
          redirectUrls: true,
          postLogoutRedirectUrls: true,
        },
      });

      return {
        successMessage: SuccessMessages.getListSuccess('Client'),
        orderByPropertyName: request.orderByPropertyName || 'createdAt',
        sortingDirection: request.sortingDirection,
        pageNumber: request.pageNumber,
        pageSize: request.pageSize,
        totalCount: count,
        data: items.map((x) => ({
          id: x.id,
          name: x.name,
          clientId: x.clientId,
          clientType: x.clientType,
          disableStrictUrlValidation: x.disableStrictUrlValidation,
          redirectUrls: x.redirectUrls.map((r) => r.url),
          postLogoutRedirectUrls: x.postLogoutRedirectUrls.map((r) => r.url),
          createdAt: x.createdAt,
        })),
      };
    });
  }
}
