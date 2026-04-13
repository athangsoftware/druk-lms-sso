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
import { UserType } from '@app/shared';
import { DeleteChartResponse } from './delete-chart-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Charts')
@ApiBearerAuth()
@Controller('/charts')
export class DeleteChartController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteChart' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteChartResponse })
  @Authorize('dashboard.*')
  async execute(@Param('id') id: string): Promise<DeleteChartResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.chart.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Chart not found.');
      }

      // DashboardChart rows are removed via onDelete: Cascade
      await dbContext.chart.delete({ where: { id } });

      return {
        successMessage: SuccessMessages.deleteSuccess('Chart'),
      };
    });
  }
}
