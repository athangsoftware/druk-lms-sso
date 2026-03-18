import { Controller, Get, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../..';
import { PrismaService, UserType } from '@app/prisma-sso';
import { GetUserRoleListResponse } from './get-user-role-list-response';
import { RbacService } from '../../rbac.service';

@ApiTags('RBAC - User Roles')
@ApiBearerAuth()
@Controller('rbac/users')
export class GetUserRoleListController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rbacService: RbacService,
  ) {}

  @Get(':userId/roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getUserRoles' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetUserRoleListResponse })
  @RequirePermission('role.read')
  async execute(@Param('userId') userId: string): Promise<GetUserRoleListResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const user = await dbContext.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const userRoles = await dbContext.userRole.findMany({
        where: { userId },
        include: { role: true },
      });

      const permissions = await this.rbacService.getUserPermissions(userId);

      return {
        successMessage: 'User roles retrieved successfully',
        data: {
          userId,
          roles: userRoles.map((ur) => ur.role.name),
          permissions,
        },
      };
    });
  }
}
