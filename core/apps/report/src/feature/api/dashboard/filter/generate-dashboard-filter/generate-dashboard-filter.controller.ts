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
import { Role } from '@app/prisma';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../../config';
import { GenerateDashboardFilterRequest } from './generate-dashboard-filter-request';
import { GenerateDashboardFilterResponse } from './generate-dashboard-filter-response';
import { SuccessMessages } from '../../../../../core/models/message';
import { AiService } from '../../../../../core/ai/ai.service';
import { decrypt } from '../../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../../core/drivers/database-driver.factory';
import { SchemaMetadata } from '../../../../../core/drivers/database-driver.interface';
import { validateQuery } from '../../../../../core/utils/query-validator.util';
import { validateColumnAgainstSchema, validateSourceQuery } from '../../../../../core/utils/filter.util';

@ApiTags('Dashboard Filters')
@ApiBearerAuth()
@Controller('/dashboards')
export class GenerateDashboardFilterController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: AiService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Post(':id/filters/generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'generateDashboardFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: GenerateDashboardFilterResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Param('id') dashboardId: string,
    @Body() body: GenerateDashboardFilterRequest,
  ): Promise<GenerateDashboardFilterResponse> {
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

    // obtain schema for AI
    const appConfig = this.configService.get<AppConfig>('app')!;
    const password = decrypt(connection.encryptedPassword, appConfig.encryptionKey);
    const driver = createDatabaseDriver(connection, password);
    const schema = await driver.getSchemaMetadata();

    // ask AI to build filter definition
    const aiResult = await this.aiService.generateFilter(body.prompt, schema);

    // validate returned SQL if provided
    if (aiResult.sql) {
      try {
        validateQuery(aiResult.sql);
      } catch (error: any) {
        throw new BadRequestException(
          `AI generated an invalid filter query: ${error.message}`,
        );
      }
    }

    // validate targetColumn against actual schema
    const warnings: string[] = [];
    const suggestions: string[] = [];

    const colValidation = validateColumnAgainstSchema(aiResult.targetColumn, schema);
    if (!colValidation.valid) {
      warnings.push(colValidation.message);
      if (colValidation.suggestions.length) {
        suggestions.push(...colValidation.suggestions);
        // auto-fix targetColumn to best suggestion
        aiResult.targetColumn = colValidation.suggestions[0];
        warnings.push(`Auto-corrected targetColumn to "${colValidation.suggestions[0]}".`);
      }
    }

    // validate sourceQuery by dry-running it
    if (aiResult.sourceQuery) {
      const sqError = await validateSourceQuery(aiResult.sourceQuery, driver);
      if (sqError) {
        warnings.push(`Source query validation failed: ${sqError}`);
        // clear the invalid sourceQuery so user can fix
        aiResult.sourceQuery = undefined;
      }
    }

    // do not persist – simply return suggestion back to client so they can review/save
    return {
      successMessage: warnings.length
        ? 'AI filter suggestion generated with warnings — please review.'
        : 'AI filter suggestion generated',
      data: {
        name: aiResult.name,
        filterType: aiResult.filterType,
        targetColumn: aiResult.targetColumn,
        sourceQuery: aiResult.sourceQuery,
        defaultValue: aiResult.defaultValue,
      },
      ...(warnings.length ? { warnings } : {}),
      ...(suggestions.length ? { suggestions } : {}),
    };
  }
}
