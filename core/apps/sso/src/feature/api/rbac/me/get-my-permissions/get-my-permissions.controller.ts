import { RequirePermission } from '../..';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@app/shared';
import { RbacService } from '../../rbac.service';
import { GetMyPermissionsResponse } from './get-my-permissions-response';

@ApiTags('RBAC - Me')
@ApiBearerAuth()
@Controller('rbac/me')
export class GetMyPermissionsController {
  constructor(private readonly rbacService: RbacService) {}

  @Get('permissions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getMyPermissions' })
  @ApiResponse({ status: HttpStatus.OK, type: GetMyPermissionsResponse })
  @RequirePermission('permission.list')
  async execute(@CurrentUser() user: any): Promise<GetMyPermissionsResponse> {
    const [roles, permissions] = await Promise.all([
      this.rbacService.getUserRoleNames(user.sub),
      this.rbacService.getUserPermissions(user.sub),
    ]);

    return {
      successMessage: 'Permissions retrieved successfully',
      data: { roles, permissions },
    };
  }
}
