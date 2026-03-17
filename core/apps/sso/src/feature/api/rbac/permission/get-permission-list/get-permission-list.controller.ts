import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { GetPermissionListResponse } from './get-permission-list-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Permissions')
@ApiBearerAuth()
@Controller('rbac/permissions')
export class GetPermissionListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getPermissionList' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetPermissionListResponse })
  @Authorize(UserType.SUPER_ADMIN, UserType.MODRATOR)
  async execute(): Promise<GetPermissionListResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const permissions = await dbContext.permission.findMany({
        include: { resource: true, action: true, group: true },
        orderBy: [{ resource: { name: 'asc' } }, { action: { name: 'asc' } }],
      });

      return {
        successMessage: SuccessMessages.getListSuccess('Permission'),
        data: permissions.map((p) => ({
          id: p.id,
          resourceId: p.resourceId,
          actionId: p.actionId,
          groupId: p.groupId,
          resourceName: p.resource.name,
          actionName: p.action.name,
          groupName: p.group?.name ?? null,
          isActive: p.isActive,
          createdAt: p.createdAt,
        })),
      };
    });
  }
}
