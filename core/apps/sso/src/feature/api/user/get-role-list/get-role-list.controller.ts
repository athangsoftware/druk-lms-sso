import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
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
  @Authorize(UserType.MODRATOR, UserType.SUPER_ADMIN, UserType.DEV)
  @HttpCode(200)
  async execute(): Promise<GetRoleListResponse> {
    return {
      successMessage: SuccessMessages.getListSuccess('Role'),
      data: userTypes.map((ut) => ({ id: ut.id, name: ut.name })),
    };
  }
}
