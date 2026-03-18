import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../..';
import { PrismaService, UserType } from '@app/prisma-sso';
import { CreateRoleRequest } from './create-role-request';
import { CreateRoleResponse } from './create-role-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Roles')
@ApiBearerAuth()
@Controller('rbac/roles')
export class CreateRoleController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createRole' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role successfully created', type: CreateRoleResponse })
  @RequirePermission('role.create')
  async execute(@Body() body: CreateRoleRequest): Promise<CreateRoleResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.role.findUnique({ where: { name: body.name } });
      if (existing) {
        throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);
      }

      if (body.parentRoleId) {
        const parentRole = await dbContext.role.findUnique({ where: { id: body.parentRoleId } });
        if (!parentRole) {
          throw new HttpException('Parent role not found', HttpStatus.BAD_REQUEST);
        }
      }

      const role = await dbContext.role.create({
        data: {
          name: body.name,
          parentRoleId: body.parentRoleId ?? null,
        },
        include: { parentRole: true },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Role'),
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
