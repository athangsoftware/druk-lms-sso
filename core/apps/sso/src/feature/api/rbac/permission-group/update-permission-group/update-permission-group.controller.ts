import { Controller, Put, HttpCode, HttpStatus, Body, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../..';
import { PrismaService, UserType } from '@app/prisma-sso';
import { UpdatePermissionGroupRequest } from './update-permission-group-request';
import { UpdatePermissionGroupResponse } from './update-permission-group-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Permission Groups')
@ApiBearerAuth()
@Controller('rbac/permission-groups')
export class UpdatePermissionGroupController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updatePermissionGroup' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permission group successfully updated', type: UpdatePermissionGroupResponse })
  @RequirePermission('permission.create')
  async execute(@Param('id') id: string, @Body() body: UpdatePermissionGroupRequest): Promise<UpdatePermissionGroupResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.permissionGroup.findUnique({ where: { id } });
      if (!existing) {
        throw new HttpException('Permission group not found', HttpStatus.BAD_REQUEST);
      }

      if (body.name && body.name !== existing.name) {
        const duplicate = await dbContext.permissionGroup.findUnique({ where: { name: body.name } });
        if (duplicate) {
          throw new HttpException('Permission group name already exists', HttpStatus.BAD_REQUEST);
        }
      }

      const group = await dbContext.permissionGroup.update({
        where: { id },
        data: { name: body.name ?? undefined, description: body.description ?? undefined },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('Permission Group'),
        data: group,
      };
    });
  }
}
