import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { ExecuteChartQueryResponse } from './execute-chart-query-response';
import { decrypt } from '../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../core/drivers/database-driver.factory';
import { validateQuery, injectLimit } from '../../../../core/utils/query-validator.util';

const MAX_ROWS = 1000;
const TIMEOUT_MS = 30_000;

@ApiTags('Charts')
@ApiBearerAuth()
@Controller('/charts')
export class ExecuteChartQueryController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Post(':id/execute')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'executeChartQuery' })
  @ApiResponse({ status: HttpStatus.OK, type: ExecuteChartQueryResponse })
  @Authorize(Role.MEMBER)
  async execute(@Param('id') id: string): Promise<ExecuteChartQueryResponse> {
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

    try {
      validateQuery(chart.sqlQuery);
    } catch (error: any) {
      throw new BadRequestException(
        `Chart SQL query is invalid: ${error.message}`,
      );
    }

    const appConfig = this.configService.get<AppConfig>('app')!;
    const password = decrypt(
      chart.connection.encryptedPassword,
      appConfig.encryptionKey,
    );

    const driver = createDatabaseDriver(chart.connection, password);
    const sql = injectLimit(chart.sqlQuery, MAX_ROWS);
    const result = await driver.runQuery(sql, MAX_ROWS, TIMEOUT_MS);

    // Audit the query execution
    await this.prismaService.client(async ({ dbContext }) => {
      await dbContext.auditLog.create({
        data: {
          action: 'EXECUTE',
          operation: 'QUERY',
          tableName: 'rpt_charts',
          recordId: chart.id,
          newValue: { sql: chart.sqlQuery, rowCount: result.rowCount } as any,
        },
      });
    });

    return {
      successMessage: `Query executed successfully. ${result.rowCount} row(s) returned.`,
      columns: result.columns,
      rows: result.rows,
      rowCount: result.rowCount,
    };
  }
}
