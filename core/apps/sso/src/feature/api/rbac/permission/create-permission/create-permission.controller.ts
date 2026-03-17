import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { CreatePermissionRequest } from './create-permission-request';
import { CreatePermissionResponse } from './create-permission-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Permissions')
@ApiBearerAuth()
@Controller('rbac/permissions')
export class CreatePermissionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createPermission' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permission successfully created', type: CreatePermissionResponse })
  @Authorize(UserType.SUPER_ADMIN)
  async execute(@Body() body: CreatePermissionRequest): Promise<CreatePermissionResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const resource = await dbContext.resource.findUnique({ where: { id: body.resourceId } });
      if (!resource) {
        throw new HttpException('Resource not found', HttpStatus.BAD_REQUEST);
      }

      const action = await dbContext.action.findUnique({ where: { id: body.actionId } });
      if (!action) {
        throw new HttpException('Action not found', HttpStatus.BAD_REQUEST);
      }

      const existing = await dbContext.permission.findUnique({
        where: { resourceId_actionId: { resourceId: body.resourceId, actionId: body.actionId } },
      });
      if (existing) {
        throw new HttpException('Permission already exists for this resource and action', HttpStatus.BAD_REQUEST);
      }

      if (body.groupId) {
        const group = await dbContext.permissionGroup.findUnique({ where: { id: body.groupId } });
        if (!group) {
          throw new HttpException('Permission group not found', HttpStatus.BAD_REQUEST);
        }
      }

      const permission = await dbContext.permission.create({
        data: { resourceId: body.resourceId, actionId: body.actionId, groupId: body.groupId },
        include: { resource: true, action: true, group: true },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Permission'),
        data: {
          id: permission.id,
          resourceId: permission.resourceId,
          actionId: permission.actionId,
          groupId: permission.groupId,
          resourceName: permission.resource.name,
          actionName: permission.action.name,
          groupName: permission.group?.name ?? null,
          isActive: permission.isActive,
          createdAt: permission.createdAt,
        },
      };
    });
  }
}
