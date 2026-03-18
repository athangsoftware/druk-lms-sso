import { RequirePermission } from '../..';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService, UserType } from '@app/prisma-sso';
import { GetRoleListResponse } from './get-role-list-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Roles')
@ApiBearerAuth()
@Controller('rbac/roles')
export class GetRoleListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getRoleList' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetRoleListResponse })
  @RequirePermission('role.read')
  async execute(): Promise<GetRoleListResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const roles = await dbContext.role.findMany({
        include: {
          parentRole: true,
          children: true,
          permissions: {
            include: {
              permission: { include: { resource: true, action: true } },
            },
          },
        },
        orderBy: { name: 'asc' },
      });

      return {
        successMessage: SuccessMessages.getListSuccess('Role'),
        data: roles.map((role) => ({
          id: role.id,
          name: role.name,
          parentRoleId: role.parentRoleId,
          parentRoleName: role.parentRole?.name ?? null,
          isActive: role.isActive,
          createdAt: role.createdAt,
          permissions: role.permissions.map(
            (rp) => `${rp.permission.resource.name}.${rp.permission.action.name}`,
          ),
          children: role.children.map((c) => ({
            id: c.id,
            name: c.name,
            parentRoleId: c.parentRoleId,
            isActive: c.isActive,
            createdAt: c.createdAt,
          })),
        })),
      };
    });
  }
}
