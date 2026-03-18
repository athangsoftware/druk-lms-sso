import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../..';
import { PrismaService, UserType } from '@app/prisma-sso';
import { CreatePermissionGroupRequest } from './create-permission-group-request';
import { CreatePermissionGroupResponse } from './create-permission-group-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Permission Groups')
@ApiBearerAuth()
@Controller('rbac/permission-groups')
export class CreatePermissionGroupController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createPermissionGroup' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permission group successfully created', type: CreatePermissionGroupResponse })
  @RequirePermission('permission.create')
  async execute(@Body() body: CreatePermissionGroupRequest): Promise<CreatePermissionGroupResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.permissionGroup.findUnique({ where: { name: body.name } });
      if (existing) {
        throw new HttpException('Permission group already exists', HttpStatus.BAD_REQUEST);
      }

      const group = await dbContext.permissionGroup.create({
        data: { name: body.name, description: body.description, clientId: body.clientId },
        include: { client: true },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Permission Group'),
        data: {
          id: group.id,
          name: group.name,
          description: group.description,
          clientId: group.clientId,
          clientName: group.client?.name ?? null,
          createdAt: group.createdAt,
        },
      };
    });
  }
}
