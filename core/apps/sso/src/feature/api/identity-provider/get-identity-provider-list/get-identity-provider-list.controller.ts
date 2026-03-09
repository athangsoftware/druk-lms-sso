import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, Prisma, Role } from '@app/prisma-sso';
import { GetIdentityProviderListRequest } from './get-identity-provider-list-request';
import { GetIdentityProviderListResponse } from './get-identity-provider-list-response';
import { SuccessMessages } from '../../../../core/models/message';
import { IdentityProviderService } from '../../identity-provider.service';

@ApiTags('Identity Provider')
@ApiBearerAuth()
@Controller('/identity-providers')
export class GetIdentityProviderListController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly idpService: IdentityProviderService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getIdentityProviderList' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetIdentityProviderListResponse })
  @Authorize(Role.MODRATOR)
  async execute(@Query() request: GetIdentityProviderListRequest): Promise<GetIdentityProviderListResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const whereCondition: Prisma.IdentityProviderWhereInput = { AND: [] };

      if (request.search) {
        whereCondition.OR = [
          { name: { contains: request.search } },
          { slug: { contains: request.search } },
        ];
      }

      if (request.nameValue) {
        (whereCondition.AND as Prisma.IdentityProviderWhereInput[]).push({
          name: { [request.nameOperation === 'exact' ? 'equals' : 'contains']: request.nameValue },
        });
      }

      if (request.slugValue) {
        (whereCondition.AND as Prisma.IdentityProviderWhereInput[]).push({
          slug: { [request.slugOperation === 'exact' ? 'equals' : 'contains']: request.slugValue },
        });
      }

      if (request.typeValue) {
        (whereCondition.AND as Prisma.IdentityProviderWhereInput[]).push({
          type: { equals: request.typeValue as any },
        });
      }

      if (request.isEnabledValue !== undefined && request.isEnabledValue !== null) {
        (whereCondition.AND as Prisma.IdentityProviderWhereInput[]).push({
          isEnabled: request.isEnabledValue === 'true',
        });
      }

      let orderByCondition: Prisma.IdentityProviderOrderByWithRelationInput = {};
      switch (request.orderByPropertyName) {
        case 'name': orderByCondition = { name: request.sortingDirection }; break;
        case 'slug': orderByCondition = { slug: request.sortingDirection }; break;
        case 'type': orderByCondition = { type: request.sortingDirection }; break;
        case 'displayOrder': orderByCondition = { displayOrder: request.sortingDirection }; break;
        case 'createdDate': orderByCondition = { createdAt: request.sortingDirection }; break;
        default: orderByCondition = { displayOrder: 'asc' }; break;
      }

      const count = await dbContext.identityProvider.count({ where: whereCondition });
      const items = await dbContext.identityProvider.findMany({
        skip: (request.pageNumber - 1) * request.pageSize,
        take: request.pageSize,
        where: whereCondition,
        orderBy: orderByCondition,
      });

      return {
        successMessage: SuccessMessages.getListSuccess('Identity Provider'),
        orderByPropertyName: request.orderByPropertyName || 'displayOrder',
        sortingDirection: request.sortingDirection,
        pageNumber: request.pageNumber,
        pageSize: request.pageSize,
        totalCount: count,
        data: items.map((x) => ({
          id: x.id,
          name: x.name,
          slug: x.slug,
          type: this.idpService.normalizeProviderType(x),
          iconUrl: x.iconUrl,
          isEnabled: x.isEnabled,
          displayOrder: x.displayOrder,
          createdAt: x.createdAt,
        })),
      };
    });
  }
}
