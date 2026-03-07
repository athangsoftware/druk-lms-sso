import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role, ChartType } from '@app/prisma';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { AiModifyChartRequest } from './ai-modify-chart-request';
import { AiModifyChartResponse } from './ai-modify-chart-response';
import { SuccessMessages } from '../../../../core/models/message';
import { AiService } from '../../../../core/ai/ai.service';
import { decrypt } from '../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../core/drivers/database-driver.factory';
import { validateQuery } from '../../../../core/utils/query-validator.util';

@ApiTags('Charts')
@ApiBearerAuth()
@Controller('/charts')
export class AiModifyChartController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: AiService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Post(':id/ai-modify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'aiModifyChart' })
  @ApiResponse({ status: HttpStatus.OK, type: AiModifyChartResponse })
  @Authorize(Role.MEMBER)
  async execute(
    @Param('id') id: string,
    @Body() body: AiModifyChartRequest,
  ): Promise<AiModifyChartResponse> {
    const chart = await this.prismaService.client(
      async ({ dbContext }) => {
        const c = await dbContext.chart.findUnique({
          where: { id },
          include: { connection: true },
        });
        if (!c) {
          throw new NotFoundException('Chart not found.');
        }
        return c;
      },
      { isTransaction: false },
    );

    const appConfig = this.configService.get<AppConfig>('app')!;
    const password = decrypt(chart.connection.encryptedPassword, appConfig.encryptionKey);
    const driver = createDatabaseDriver(chart.connection, password);
    const schema = await driver.getSchemaMetadata();

    const aiResult = await this.aiService.modifyChart(
      body.prompt,
      chart.chartConfig as Record<string, unknown>,
      schema,
    );

    try {
      validateQuery(aiResult.sql);
    } catch (error: any) {
      throw new BadRequestException(
        `AI generated an invalid query: ${error.message}`,
      );
    }

    const chartTypeMapped = aiResult.chartType.toUpperCase() as ChartType;

    return await this.prismaService.client(async ({ dbContext }) => {
      const updated = await dbContext.chart.update({
        where: { id },
        data: {
          name: aiResult.chartTitle,
          sqlQuery: aiResult.sql,
          chartType: chartTypeMapped,
          chartConfig: aiResult.chartConfig as any,
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
