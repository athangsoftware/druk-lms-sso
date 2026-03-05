import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Prisma, Role } from '@app/prisma';
import { GetUserListRequest } from './get-user-list-request';
import { GetUserListResponse } from './get-user-list-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/users')
export class GetUserListController {
  constructor(private readonly prismaService: PrismaService) {}
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetUserListResponse })
  @ApiOperation({ operationId: 'getUserList' })
  @Authorize(Role.MODRATOR)
  @HttpCode(200)
  async execute(@Query() request: GetUserListRequest): Promise<GetUserListResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const whereCondition: Prisma.UserWhereInput = { AND: [] };

      if (request.search) {
        whereCondition.OR = [
          { id: { contains: request.search } },
          { firstName: { contains: request.search } },
          { lastName: { contains: request.search } },
          { email: { contains: request.search } },
          { phoneNumber: { contains: request.search } },
        ];
      }

      if (request.firstNameValue) {
        (whereCondition.AND as Prisma.UserWhereInput[]).push({
          firstName: { [request.firstNameOperation === 'exact' ? 'equals' : 'contains']: request.firstNameValue },
        });
      }
      if (request.lastNameValue) {
        (whereCondition.AND as Prisma.UserWhereInput[]).push({
          lastName: { [request.lastNameOperation === 'exact' ? 'equals' : 'contains']: request.lastNameValue },
        });
      }
      if (request.emailValue) {
        (whereCondition.AND as Prisma.UserWhereInput[]).push({
          email: { [request.emailOperation === 'exact' ? 'equals' : 'contains']: request.emailValue },
        });
      }
      if (request.roleIdValue?.length) {
        (whereCondition.AND as Prisma.UserWhereInput[]).push({
          role: { in: request.roleIdValue as Role[] },
        });
      }
      if (request.phoneNumberValue) {
        (whereCondition.AND as Prisma.UserWhereInput[]).push({
          phoneNumber: { [request.phoneNumberOperation === 'exact' ? 'equals' : 'contains']: request.phoneNumberValue },
        });
      }
      if (request.isActiveValue !== undefined && request.isActiveValue !== null) {
        (whereCondition.AND as Prisma.UserWhereInput[]).push({
          isActive: { equals: request.isActiveValue === 'true' },
        });
      }

      let orderByCondition: Prisma.UserOrderByWithRelationInput = {};
      switch (request.orderByPropertyName) {
        case 'firstName': orderByCondition = { firstName: request.sortingDirection }; break;
        case 'lastName': orderByCondition = { lastName: request.sortingDirection }; break;
        case 'email': orderByCondition = { email: request.sortingDirection }; break;
        case 'phoneNumber': orderByCondition = { phoneNumber: request.sortingDirection }; break;
        case 'createdDate': orderByCondition = { createdAt: request.sortingDirection }; break;
        default: orderByCondition = { createdAt: 'desc' }; break;
      }

      const count = await dbContext.user.count({ where: whereCondition });
      const items = await dbContext.user.findMany({
        skip: (request.pageNumber - 1) * request.pageSize,
        take: request.pageSize,
        where: whereCondition,
        orderBy: orderByCondition,
      });

      return {
        successMessage: SuccessMessages.getListSuccess('User'),
        orderByPropertyName: request.orderByPropertyName || 'createdAt',
        sortingDirection: request.sortingDirection,
        pageNumber: request.pageNumber,
        pageSize: request.pageSize,
        totalCount: count,
        data: items.map((x) => ({
          id: x.id,
          firstName: x.firstName,
          lastName: x.lastName || '',
          email: x.email,
          phoneNumber: x.phoneNumber || '',
          createdDate: x.createdAt,
          isActive: x.isActive,
          roleId: x.role,
          roleName: x.role,
        })),
      };
    });
  }
}
