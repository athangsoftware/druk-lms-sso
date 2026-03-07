import {
  Controller,
  Get,
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
import { AppConfig } from '../../../../../config';
import { GetFilterOptionsResponse } from './get-filter-options-response';
import { decrypt } from '../../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../../core/drivers/database-driver.factory';
import { validateQuery } from '../../../../../core/utils/query-validator.util';

const MAX_OPTIONS = 1000;
const TIMEOUT_MS = 15_000;

// Simple in-memory cache: key → { data, expiresAt }
const optionsCache = new Map<string, { data: string[]; expiresAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCacheKey(connectionId: string, sourceQuery: string): string {
  return `${connectionId}::${sourceQuery}`;
}

@ApiTags('Dashboard Filters')
@ApiBearerAuth()
@Controller('/dashboards')
export class GetFilterOptionsController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Get(':id/filters/:filterId/options')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getFilterOptions' })
  @ApiResponse({ status: HttpStatus.OK, type: GetFilterOptionsResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Param('id') dashboardId: string,
    @Param('filterId') filterId: string,
  ): Promise<GetFilterOptionsResponse> {
    const filter = await this.prismaService.client(
      async ({ dbContext }) => {
        const f = await dbContext.dashboardFilter.findFirst({
          where: { id: filterId, dashboardId },
          include: { connection: true },
        });
        if (!f) {
          throw new NotFoundException('Dashboard filter not found.');
        }
        return f;
      },
      { isTransaction: false },
    );

    if (!filter.sourceQuery) {
      throw new BadRequestException(
        'This filter does not have a source query defined.',
      );
    }

    try {
      validateQuery(filter.sourceQuery);
    } catch (error: any) {
      throw new BadRequestException(
        `Filter source query is invalid: ${error.message}`,
      );
    }

    // Check cache
    const cacheKey = getCacheKey(filter.connectionId, filter.sourceQuery);
    const cached = optionsCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return {
        successMessage: 'Filter options retrieved from cache.',
        options: cached.data,
      };
    }

    const appConfig = this.configService.get<AppConfig>('app')!;
    const password = decrypt(
      filter.connection.encryptedPassword,
      appConfig.encryptionKey,
    );

    const driver = createDatabaseDriver(filter.connection, password);
    const result = await driver.runQuery(
      filter.sourceQuery,
      MAX_OPTIONS,
      TIMEOUT_MS,
    );

    // Extract first column values as options
    const firstCol = result.columns[0];
    if (!firstCol) {
      return { successMessage: 'No options returned.', options: [] };
    }

    const options = result.rows
      .map((row) => String(row[firstCol] ?? ''))
      .filter((v) => v !== '');

    // Store in cache
    optionsCache.set(cacheKey, {
      data: options,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return {
      successMessage: `${options.length} option(s) retrieved.`,
      options,
    };
  }
}
