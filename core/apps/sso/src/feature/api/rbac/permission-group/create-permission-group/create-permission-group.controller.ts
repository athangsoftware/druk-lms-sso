import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
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
  @Authorize(UserType.SUPER_ADMIN)
  async execute(@Body() body: CreatePermissionGroupRequest): Promise<CreatePermissionGroupResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.permissionGroup.findUnique({ where: { name: body.name } });
      if (existing) {
        throw new HttpException('Permission group already exists', HttpStatus.BAD_REQUEST);
      }

      const group = await dbContext.permissionGroup.create({
        data: { name: body.name, description: body.description },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Permission Group'),
        data: group,
      };
    });
  }
}
