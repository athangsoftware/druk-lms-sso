import { Controller, Post, HttpCode, HttpStatus, Body, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { AssignRolePermissionsRequest } from './assign-role-permissions-request';
import { AssignRolePermissionsResponse } from './assign-role-permissions-response';

@ApiTags('RBAC - Roles')
@ApiBearerAuth()
@Controller('rbac/roles')
export class AssignRolePermissionsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post(':id/permissions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'assignPermissionsToRole' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permissions assigned to role', type: AssignRolePermissionsResponse })
  @Authorize(UserType.SUPER_ADMIN)
  async execute(
    @Param('id') id: string,
    @Body() body: AssignRolePermissionsRequest,
  ): Promise<AssignRolePermissionsResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const role = await dbContext.role.findUnique({ where: { id } });
        if (!role) {
          throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }

        // Remove existing permissions and replace with new set
        await dbContext.rolePermission.deleteMany({ where: { roleId: id } });

        if (body.permissionIds.length > 0) {
          const permissions = await dbContext.permission.findMany({
            where: { id: { in: body.permissionIds } },
          });

          if (permissions.length !== body.permissionIds.length) {
            throw new HttpException('One or more permissions not found', HttpStatus.BAD_REQUEST);
          }

          await dbContext.rolePermission.createMany({
            data: body.permissionIds.map((permissionId) => ({
              roleId: id,
              permissionId,
            })),
          });
        }

        return { successMessage: 'Permissions assigned to role successfully' };
      },
      { isTransaction: true },
    );
  }
}
