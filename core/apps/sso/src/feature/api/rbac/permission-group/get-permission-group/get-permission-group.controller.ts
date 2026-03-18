import { Controller, Get, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../..';
import { PrismaService, UserType } from '@app/prisma-sso';
import { GetPermissionGroupResponse } from './get-permission-group-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Permission Groups')
@ApiBearerAuth()
@Controller('rbac/permission-groups')
export class GetPermissionGroupController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getPermissionGroup' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetPermissionGroupResponse })
  @RequirePermission('permission.read')
  async execute(@Param('id') id: string): Promise<GetPermissionGroupResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const group = await dbContext.permissionGroup.findUnique({
        where: { id },
        include: {
          permissions: { include: { resource: true, action: true }, orderBy: [{ resource: { name: 'asc' } }, { action: { name: 'asc' } }] },
        },
      });

      if (!group) {
        throw new HttpException('Permission group not found', HttpStatus.BAD_REQUEST);
      }

      return {
        successMessage: SuccessMessages.getSuccess('Permission Group'),
        data: {
          id: group.id,
          name: group.name,
          description: group.description,
          createdAt: group.createdAt,
          permissions: group.permissions.map((p) => ({
            id: p.id,
            resourceId: p.resourceId,
            actionId: p.actionId,
            groupId: p.groupId,
            resourceName: p.resource.name,
            actionName: p.action.name,
            isActive: p.isActive,
            createdAt: p.createdAt,
          })),
        },
      };
    });
  }
}
