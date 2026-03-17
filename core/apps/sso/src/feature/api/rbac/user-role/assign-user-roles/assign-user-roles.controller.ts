import { Controller, Post, HttpCode, HttpStatus, Body, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { AssignUserRolesRequest } from './assign-user-roles-request';
import { AssignUserRolesResponse } from './assign-user-roles-response';

@ApiTags('RBAC - User Roles')
@ApiBearerAuth()
@Controller('rbac/users')
export class AssignUserRolesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post(':userId/roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'assignRolesToUser' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Roles assigned to user', type: AssignUserRolesResponse })
  @Authorize(UserType.SUPER_ADMIN)
  async execute(
    @Param('userId') userId: string,
    @Body() body: AssignUserRolesRequest,
  ): Promise<AssignUserRolesResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const user = await dbContext.user.findUnique({ where: { id: userId } });
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Remove existing role assignments and replace
        await dbContext.userRole.deleteMany({ where: { userId } });

        if (body.roleIds.length > 0) {
          const roles = await dbContext.role.findMany({
            where: { id: { in: body.roleIds }, isActive: true },
          });

          if (roles.length !== body.roleIds.length) {
            throw new HttpException('One or more roles not found or inactive', HttpStatus.BAD_REQUEST);
          }

          await dbContext.userRole.createMany({
            data: body.roleIds.map((roleId) => ({
              userId,
              roleId,
            })),
          });
        }

        return { successMessage: 'Roles assigned to user successfully' };
      },
      { isTransaction: true },
    );
  }
}
