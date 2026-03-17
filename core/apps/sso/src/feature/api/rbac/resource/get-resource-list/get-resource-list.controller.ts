import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { GetResourceListResponse } from './get-resource-list-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Resources')
@ApiBearerAuth()
@Controller('rbac/resources')
export class GetResourceListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getResourceList' })
  @ApiResponse({ status: HttpStatus.OK, description: '', type: GetResourceListResponse })
  @Authorize(UserType.SUPER_ADMIN, UserType.MODRATOR)
  async execute(): Promise<GetResourceListResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const resources = await dbContext.resource.findMany({ orderBy: { name: 'asc' } });
      return {
        successMessage: SuccessMessages.getListSuccess('Resource'),
        data: resources,
      };
    });
  }
}
