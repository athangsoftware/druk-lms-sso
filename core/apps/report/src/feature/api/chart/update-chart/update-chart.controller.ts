import {
  Controller,
  Put,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { Role } from '@app/shared';
import { UpdateChartRequest } from './update-chart-request';
import { UpdateChartResponse } from './update-chart-response';
import { SuccessMessages } from '../../../../core/models/message';
import { validateQuery } from '../../../../core/utils/query-validator.util';

@ApiTags('Charts')
@ApiBearerAuth()
@Controller('/charts')
export class UpdateChartController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateChart' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateChartResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateChartRequest,
  ): Promise<UpdateChartResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.chart.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Chart not found.');
      }

      if (body.sqlQuery) {
        try {
          validateQuery(body.sqlQuery);
        } catch (error: any) {
          throw new BadRequestException(error.message);
        }
      }

      const updated = await dbContext.chart.update({
        where: { id },
        data: {
          ...(body.name !== undefined && { name: body.name }),
          ...(body.sqlQuery !== undefined && { sqlQuery: body.sqlQuery }),
          ...(body.chartType !== undefined && { chartType: body.chartType }),
          ...(body.chartConfig !== undefined && { chartConfig: body.chartConfig as any }),
        },
        include: { connection: true },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('Chart'),
        data: {
          id: updated.id,
          name: updated.name,
          connectionId: updated.connectionId,
          connectionName: updated.connection.name,
          sqlQuery: updated.sqlQuery,
          chartType: updated.chartType,
          chartConfig: updated.chartConfig as Record<string, unknown>,
          createdAt: updated.createdAt,
          updatedAt: updated.updatedAt,
        },
      };
    });
  }
}
