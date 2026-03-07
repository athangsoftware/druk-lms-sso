import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  BadRequestException,
  Inject,
  Body,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { ExecuteChartQueryResponse } from './execute-chart-query-response';
import { ExecuteChartQueryRequest } from './execute-chart-query-request';
import { decrypt } from '../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../core/drivers/database-driver.factory';
import {
  validateQuery,
  injectLimit,
  buildFilterCondition,
  injectFilters,
} from '../../../../core/utils/query-validator.util';

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
  async execute(
    @Param('id') id: string,
    @Body() body: ExecuteChartQueryRequest,
  ): Promise<ExecuteChartQueryResponse> {
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

    // Resolve and apply dashboard filters when provided
    let sqlWithFilters = chart.sqlQuery;

    if (body?.filters?.length) {
      const filterIds = body.filters.map((f) => f.filterId);

      const filterDefs = await this.prismaService.client(
        async ({ dbContext }) => {
          return dbContext.dashboardFilter.findMany({
            where: { id: { in: filterIds } },
          });
        },
        { isTransaction: false },
      );

      const filterMap = new Map(filterDefs.map((f) => [f.id, f]));
      const conditions: string[] = [];

      for (const item of body.filters) {
        const def = filterMap.get(item.filterId);
        if (!def) continue;
        try {
          const condition = buildFilterCondition({
            filterType: def.filterType,
            targetColumn: def.targetColumn,
            value: item.value,
          });
          if (condition) conditions.push(condition);
        } catch (err: any) {
          throw new BadRequestException(
            `Filter "${def.name}" has invalid value: ${err.message}`,
          );
        }
      }

      if (conditions.length) {
        sqlWithFilters = injectFilters(chart.sqlQuery, conditions);
        try {
          validateQuery(sqlWithFilters);
        } catch (error: any) {
          throw new BadRequestException(
            `Filtered query is invalid: ${error.message}`,
          );
        }
      }
    }

    const appConfig = this.configService.get<AppConfig>('app')!;
    const password = decrypt(
      chart.connection.encryptedPassword,
      appConfig.encryptionKey,
    );

    const driver = createDatabaseDriver(chart.connection, password);
    const sql = injectLimit(sqlWithFilters, MAX_ROWS);
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

