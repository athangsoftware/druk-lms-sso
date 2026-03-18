import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../..';
import { PrismaService, UserType } from '@app/prisma-sso';
import { GetPermissionGroupListResponse } from './get-permission-group-list-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Permission Groups')
@ApiBearerAuth()
@Controller('rbac/permission-groups')
export class GetPermissionGroupListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getPermissionGroupList' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetPermissionGroupListResponse })
  @RequirePermission('permission.list')
  async execute(): Promise<GetPermissionGroupListResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const groups = await dbContext.permissionGroup.findMany({
        include: {
          client: true,
          permissions: { include: { resource: true, action: true }, orderBy: [{ resource: { name: 'asc' } }, { action: { name: 'asc' } }] },
        },
        orderBy: { name: 'asc' },
      });

      return {
        successMessage: SuccessMessages.getListSuccess('Permission Group'),
        data: groups.map((g) => ({
          id: g.id,
          name: g.name,
          description: g.description,
          clientId: g.clientId,
          clientName: g.client?.name ?? null,
          createdAt: g.createdAt,
          permissions: g.permissions.map((p) => ({
            id: p.id,
            resourceId: p.resourceId,
            actionId: p.actionId,
            groupId: p.groupId,
            resourceName: p.resource.name,
            actionName: p.action.name,
            isActive: p.isActive,
            createdAt: p.createdAt,
          })),
        })),
      };
    });
  }
}
