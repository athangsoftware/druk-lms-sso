import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { Role } from '@app/shared';
import { DeleteGlobalFilterResponse } from './delete-global-filter-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Global Filters')
@ApiBearerAuth()
@Controller('/global-filters')
export class DeleteGlobalFilterController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteGlobalFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteGlobalFilterResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Param('id') id: string,
  ): Promise<DeleteGlobalFilterResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.globalFilter.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Global filter not found.');
      }

      await dbContext.globalFilter.delete({ where: { id } });

      return {
        successMessage: SuccessMessages.deleteSuccess('Global filter'),
      };
    });
  }
}
