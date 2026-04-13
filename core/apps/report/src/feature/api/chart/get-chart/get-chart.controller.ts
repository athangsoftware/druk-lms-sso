import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { GetChartResponse } from './get-chart-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Charts')
@ApiBearerAuth()
@Controller('/charts')
export class GetChartController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getChart' })
  @ApiResponse({ status: HttpStatus.OK, type: GetChartResponse })
  @Authorize('dashboard.*')
  async execute(@Param('id') id: string): Promise<GetChartResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const chart = await dbContext.chart.findUnique({
          where: { id },
          include: { connection: true },
        });
        if (!chart) {
          throw new NotFoundException('Chart not found.');
        }

        return {
          successMessage: SuccessMessages.getSuccess('Chart'),
          data: {
            id: chart.id,
            name: chart.name,
            connectionId: chart.connectionId,
            connectionName: chart.connection.name,
            sqlQuery: chart.sqlQuery,
            chartType: chart.chartType,
            chartConfig: chart.chartConfig as Record<string, unknown>,
            createdAt: chart.createdAt,
            updatedAt: chart.updatedAt,
          },
        };
      },
      { isTransaction: false },
    );
  }
}
