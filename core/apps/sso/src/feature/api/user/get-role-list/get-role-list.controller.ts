import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { GetRoleListResponse } from './get-role-list-response';
import { roles } from '../../../../core/enum-mapping';
import { SuccessMessages } from '../../../../core/models/message';
import { Role } from '@app/prisma';

@ApiTags('User')
@ApiBearerAuth()
@Controller('roles')
export class GetRoleListController {
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetRoleListResponse })
  @ApiOperation({ operationId: 'getRoleList' })
  @Authorize(Role.MODRATOR, Role.SUPER_ADMIN, Role.DEV)
  @HttpCode(200)
  async execute(): Promise<GetRoleListResponse> {
    return {
      successMessage: SuccessMessages.getListSuccess('Role'),
      data: roles.map((role) => ({ id: role.id, name: role.name })),
    };
  }
}
