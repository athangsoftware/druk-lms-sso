import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { ExecuteChartQueryRequest } from './execute-chart-query-request';
import { ExecuteChartQueryResponse } from './execute-chart-query-response';
import { decrypt } from '../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../core/drivers/database-driver.factory';
import { validateQuery, injectLimit } from '../../../../core/utils/query-validator.util';
import { buildFilterSql, injectFilters, buildGlobalFilterSql, extractSchemaColumnNames } from '../../../../core/utils/filter.util';

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
  @Authorize('dashboard.*')
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

    // Build filter SQL fragment if dashboard filters are supplied
    let querySql = chart.sqlQuery;
    const isSqlBased = chart.connection.dbType !== 'MONGODB';

    const appConfig = this.configService.get<AppConfig>('app')!;
    const password = decrypt(
      chart.connection.encryptedPassword,
      appConfig.encryptionKey,
    );
    const driver = createDatabaseDriver(chart.connection, password);

    // --- Global filters (SQL-based connections only) ---
    const globalFilters = await this.prismaService.client(
      async ({ dbContext }) => dbContext.globalFilter.findMany({ where: { isEnabled: true }, orderBy: { order: 'asc' } }),
      { isTransaction: false },
    );

    if (isSqlBased && globalFilters.length) {
      const overridesMap = new Map<string, { globalFilterId: string; isDisabled: boolean; columnValue: string | null; missingColumnBehavior: any }>(); 
      if (body?.dashboardId) {
        const overrides = await this.prismaService.client(
          async ({ dbContext }) => dbContext.globalFilterOverride.findMany({ where: { dashboardId: body.dashboardId } }),
          { isTransaction: false },
        );
        for (const o of overrides) {
          overridesMap.set(o.globalFilterId, o);
        }
      }

      const schema = await driver.getSchemaMetadata();
      const schemaColumns = extractSchemaColumnNames(schema);

      const globalResult = buildGlobalFilterSql(globalFilters, overridesMap, schemaColumns);
      if (globalResult.blocked) {
        return {
          successMessage: 'Query blocked by global filter (HIDE_DATA). 0 row(s) returned.',
          columns: [],
          rows: [],
          rowCount: 0,
        };
      }
      if (globalResult.sql) {
        querySql = injectFilters(querySql, globalResult.sql);
      }
    }

    // --- Dashboard filters (SQL-based connections only) ---
    if (isSqlBased && body?.dashboardId && body?.filterValues && Object.keys(body.filterValues).length) {
      const filters = await this.prismaService.client(
        async ({ dbContext }) => {
          return dbContext.dashboardFilter.findMany({
            where: { dashboardId: body.dashboardId },
          });
        },
        { isTransaction: false },
      );

      if (filters.length) {
        const filterFragment = buildFilterSql(
          filters.map((f) => ({
            id: f.id,
            filterType: f.filterType,
            targetColumn: f.targetColumn,
          })),
          body.filterValues,
        );
        if (filterFragment) {
          querySql = injectFilters(querySql, filterFragment);
        }
      }
    }

    try {
      validateQuery(querySql, chart.connection.dbType);
    } catch (error: any) {
      throw new BadRequestException(
        `Chart query is invalid: ${error.message}`,
      );
    }

    const sql = injectLimit(querySql, MAX_ROWS, chart.connection.dbType);
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
