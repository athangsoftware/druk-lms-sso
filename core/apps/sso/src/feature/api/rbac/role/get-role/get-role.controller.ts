import { RequirePermission } from '../..';
import { Controller, Get, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService, UserType } from '@app/prisma-sso';
import { GetRoleResponse } from './get-role-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Roles')
@ApiBearerAuth()
@Controller('rbac/roles')
export class GetRoleController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getRole' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetRoleResponse })
  @RequirePermission('role.read')
  async execute(@Param('id') id: string): Promise<GetRoleResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const role = await dbContext.role.findUnique({
        where: { id },
        include: {
          parentRole: true,
          children: true,
          permissions: {
            include: {
              permission: { include: { resource: true, action: true } },
            },
          },
        },
      });

      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      return {
        successMessage: SuccessMessages.getSuccess('Role'),
        data: {
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
        },
      };
    });
  }
}
