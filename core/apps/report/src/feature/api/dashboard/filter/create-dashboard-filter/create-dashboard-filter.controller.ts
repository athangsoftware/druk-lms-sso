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
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../../config';
import { CreateDashboardFilterRequest } from './create-dashboard-filter-request';
import { CreateDashboardFilterResponse } from './create-dashboard-filter-response';
import { SuccessMessages } from '../../../../../core/models/message';
import { validateColumnName, validateColumnAgainstSchema, validateSourceQuery } from '../../../../../core/utils/filter.util';
import { validateQuery } from '../../../../../core/utils/query-validator.util';
import { decrypt } from '../../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../../core/drivers/database-driver.factory';

@ApiTags('Dashboard Filters')
@ApiBearerAuth()
@Controller('/dashboards')
export class CreateDashboardFilterController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Post(':id/filters')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createDashboardFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateDashboardFilterResponse })
  @Authorize('user.read')
  async execute(
    @Param('id') dashboardId: string,
    @Body() body: CreateDashboardFilterRequest,
  ): Promise<CreateDashboardFilterResponse> {
    try {
      validateColumnName(body.targetColumn);
    } catch {
      throw new BadRequestException('Invalid target column name.');
    }

    if (body.sourceQuery) {
      try {
        validateQuery(body.sourceQuery);
      } catch (error: any) {
        throw new BadRequestException(`Invalid source query: ${error.message}`);
      }
    }

    return await this.prismaService.client(async ({ dbContext }) => {
      const dashboard = await dbContext.dashboard.findUnique({
        where: { id: dashboardId },
      });
      if (!dashboard) {
        throw new NotFoundException('Dashboard not found.');
      }

      const connection = await dbContext.dbConnection.findUnique({
        where: { id: body.connectionId },
      });
      if (!connection) {
        throw new NotFoundException('Database connection not found.');
      }

      // validate targetColumn against actual database schema
      const appConfig = this.configService.get<AppConfig>('app')!;
      const password = decrypt(connection.encryptedPassword, appConfig.encryptionKey);
      const driver = createDatabaseDriver(connection, password);
      const schema = await driver.getSchemaMetadata();

      const colValidation = validateColumnAgainstSchema(body.targetColumn, schema);
      if (!colValidation.valid) {
        const msg = colValidation.suggestions.length
          ? `${colValidation.message} Did you mean: ${colValidation.suggestions.join(', ')}?`
          : colValidation.message;
        throw new BadRequestException(msg);
      }

      // dry-run sourceQuery against the real database
      if (body.sourceQuery) {
        const sqError = await validateSourceQuery(body.sourceQuery, driver);
        if (sqError) {
          throw new BadRequestException(`Source query is invalid: ${sqError}`);
        }
      }

      const count = await dbContext.dashboardFilter.count({
        where: { dashboardId },
      });

      const filter = await dbContext.dashboardFilter.create({
        data: {
          dashboardId,
          name: body.name,
          filterType: body.filterType,
          connectionId: body.connectionId,
          targetColumn: body.targetColumn,
          sourceQuery: body.sourceQuery,
          defaultValue: body.defaultValue,
          order: body.order ?? count,
        },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Dashboard filter'),
        data: {
          id: filter.id,
          dashboardId: filter.dashboardId,
          name: filter.name,
          filterType: filter.filterType,
          connectionId: filter.connectionId,
          targetColumn: filter.targetColumn,
          sourceQuery: filter.sourceQuery,
          defaultValue: filter.defaultValue,
          order: filter.order,
          createdAt: filter.createdAt,
          updatedAt: filter.updatedAt,
        },
      };
    });
  }
}
