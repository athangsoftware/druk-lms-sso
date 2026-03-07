import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { ListGlobalFiltersResponse } from './list-global-filters-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Global Filters')
@ApiBearerAuth()
@Controller('/global-filters')
export class ListGlobalFiltersController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'listGlobalFilters' })
  @ApiResponse({ status: HttpStatus.OK, type: ListGlobalFiltersResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(): Promise<ListGlobalFiltersResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const filters = await dbContext.globalFilter.findMany({
          orderBy: { order: 'asc' },
        });

        return {
          successMessage: SuccessMessages.getListSuccess('Global filter'),
          data: filters.map((f) => ({
            id: f.id,
            columnName: f.columnName,
            columnValue: f.columnValue,
            missingColumnBehavior: f.missingColumnBehavior,
            isEnabled: f.isEnabled,
            order: f.order,
            createdAt: f.createdAt,
            updatedAt: f.updatedAt,
          })),
        };
      },
      { isTransaction: false },
    );
  }
}
