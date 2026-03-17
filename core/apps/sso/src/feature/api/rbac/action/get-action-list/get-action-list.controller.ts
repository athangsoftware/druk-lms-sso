import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { GetActionListResponse } from './get-action-list-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Actions')
@ApiBearerAuth()
@Controller('rbac/actions')
export class GetActionListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getActionList' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetActionListResponse })
  @Authorize(UserType.SUPER_ADMIN, UserType.MODRATOR)
  async execute(): Promise<GetActionListResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const actions = await dbContext.action.findMany({ orderBy: { name: 'asc' } });
      return {
        successMessage: SuccessMessages.getListSuccess('Action'),
        data: actions,
      };
    });
  }
}
