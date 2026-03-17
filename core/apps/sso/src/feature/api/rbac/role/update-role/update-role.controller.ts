import { Controller, Put, HttpCode, HttpStatus, Body, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { UpdateRoleRequest } from './update-role-request';
import { UpdateRoleResponse } from './update-role-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Roles')
@ApiBearerAuth()
@Controller('rbac/roles')
export class UpdateRoleController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateRole' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role successfully updated', type: UpdateRoleResponse })
  @Authorize(UserType.SUPER_ADMIN)
  async execute(@Param('id') id: string, @Body() body: UpdateRoleRequest): Promise<UpdateRoleResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.role.findUnique({ where: { id } });
      if (!existing) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      if (body.name && body.name !== existing.name) {
        const duplicate = await dbContext.role.findUnique({ where: { name: body.name } });
        if (duplicate) {
          throw new HttpException('Role name already exists', HttpStatus.BAD_REQUEST);
        }
      }

      if (body.parentRoleId) {
        if (body.parentRoleId === id) {
          throw new HttpException('Role cannot be its own parent', HttpStatus.BAD_REQUEST);
        }
        const parentRole = await dbContext.role.findUnique({ where: { id: body.parentRoleId } });
        if (!parentRole) {
          throw new HttpException('Parent role not found', HttpStatus.BAD_REQUEST);
        }
      }

      const role = await dbContext.role.update({
        where: { id },
        data: {
          ...(body.name !== undefined && { name: body.name }),
          ...(body.parentRoleId !== undefined && { parentRoleId: body.parentRoleId }),
          ...(body.isActive !== undefined && { isActive: body.isActive }),
        },
        include: { parentRole: true },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('Role'),
        data: {
          id: role.id,
          name: role.name,
          parentRoleId: role.parentRoleId,
          parentRoleName: role.parentRole?.name ?? null,
          isActive: role.isActive,
          createdAt: role.createdAt,
        },
      };
    });
  }
}
