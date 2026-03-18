import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { GetAiProviderListRequest } from './get-ai-provider-list-request';
import { GetAiProviderListResponse } from './get-ai-provider-list-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('AI Providers')
@ApiBearerAuth()
@Controller('/ai-providers')
export class GetAiProviderListController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getAiProviderList' })
  @ApiResponse({ status: HttpStatus.OK, type: GetAiProviderListResponse })
  @Authorize('user.read')
  async execute(
    @Query() request: GetAiProviderListRequest,
  ): Promise<GetAiProviderListResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const where = request.search
          ? { name: { contains: request.search } }
          : undefined;
        const count = await dbContext.aiProvider.count({ where });
        const items = await dbContext.aiProvider.findMany({
          where,
          skip: (request.pageNumber - 1) * request.pageSize,
          take: request.pageSize,
          orderBy: { createdAt: 'desc' },
        });

        return {
          successMessage: SuccessMessages.getListSuccess('AI provider'),
          data: items.map((p) => ({
            id: p.id,
            name: p.name,
            model: p.model,
            isEnabled: p.isEnabled,
            createdAt: p.createdAt,
          })),
          pageNumber: request.pageNumber,
          pageSize: request.pageSize,
          totalCount: count,
        };
      },
      { isTransaction: false },
    );
  }
}
