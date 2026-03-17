import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { ChartType } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { GenerateChartRequest } from './generate-chart-request';
import { GenerateChartResponse } from './generate-chart-response';
import { SuccessMessages } from '../../../../core/models/message';
import { AiService } from '../../../../core/ai/ai.service';
import { decrypt } from '../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../core/drivers/database-driver.factory';
import {
  validateQuery,
  validateSqlTablesAgainstSchema,
} from '../../../../core/utils/query-validator.util';

@ApiTags('Charts')
@ApiBearerAuth()
@Controller('/charts')
export class GenerateChartController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: AiService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'generateChart' })
  @ApiResponse({ status: HttpStatus.OK, type: GenerateChartResponse })
  @Authorize(UserType.MEMBER, UserType.MODRATOR, UserType.DEV, UserType.SUPER_ADMIN)
  async execute(
    @Body() body: GenerateChartRequest,
  ): Promise<GenerateChartResponse> {
    const connection = await this.prismaService.client(
      async ({ dbContext }) => {
        const conn = await dbContext.dbConnection.findUnique({
          where: { id: body.connectionId },
        });
        if (!conn) {
          throw new NotFoundException('DB connection not found.');
        }
        return conn;
      },
      { isTransaction: false },
    );

    const appConfig = this.configService.get<AppConfig>('app')!;
    const password = decrypt(connection.encryptedPassword, appConfig.encryptionKey);
    const driver = createDatabaseDriver(connection, password);
    const schema = await driver.getSchemaMetadata();

    const aiResult = await this.aiService.generateChart(body.prompt, schema);

    try {
      validateQuery(aiResult.sql);
      validateSqlTablesAgainstSchema(aiResult.sql, schema);
    } catch (error: any) {
      throw new BadRequestException(
        `AI generated an invalid query: ${error.message}`,
      );
    }

    const chartTypeMapped = aiResult.chartType.toUpperCase() as ChartType;

    return await this.prismaService.client(async ({ dbContext }) => {
      const chart = await dbContext.chart.create({
        data: {
          name: aiResult.chartTitle,
          connectionId: body.connectionId,
          sqlQuery: aiResult.sql,
          chartType: chartTypeMapped,
          chartConfig: aiResult.chartConfig as any,
        },
        include: { connection: true },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Chart'),
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
    });
  }
}
