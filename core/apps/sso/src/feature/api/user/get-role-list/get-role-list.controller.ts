import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../../rbac';
import { GetRoleListResponse } from './get-role-list-response';
import { userTypes } from '../../../../core/enum-mapping';
import { SuccessMessages } from '../../../../core/models/message';
import { UserType } from '@app/prisma-sso';

@ApiTags('User')
@ApiBearerAuth()
@Controller('roles')
export class GetRoleListController {
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetRoleListResponse })
  @ApiOperation({ operationId: 'getRoleList' })
  @RequirePermission('role.read')
  @HttpCode(200)
  async execute(): Promise<GetRoleListResponse> {
    return {
      successMessage: SuccessMessages.getListSuccess('Role'),
      data: userTypes.map((ut) => ({ id: ut.id, name: ut.name })),
    };
  }
}
