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
import { GetFilterOptionsResponse } from './get-filter-options-response';
import { SuccessMessages } from '../../../../core/models/message';
import { decrypt } from '../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../core/drivers/database-driver.factory';
import {
  validateQuery,
  injectSourceQueryLimit,
} from '../../../../core/utils/query-validator.util';

const TIMEOUT_MS = 15_000;

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('/dashboards')
export class GetFilterOptionsController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Post(':dashboardId/filters/:filterId/options')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getFilterOptions' })
  @ApiResponse({ status: HttpStatus.OK, type: GetFilterOptionsResponse })
  @Authorize(Role.MEMBER)
  async execute(
    @Param('dashboardId') dashboardId: string,
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
        'This filter does not have a source query configured.',
      );
    }

    if (!filter.connection) {
      throw new BadRequestException(
        'This filter does not have a database connection configured.',
      );
    }

    try {
      validateQuery(filter.sourceQuery);
    } catch (err: any) {
      throw new BadRequestException(
        `Filter source query is invalid: ${err.message}`,
      );
    }

    const appConfig = this.configService.get<AppConfig>('app')!;
    const password = decrypt(
      filter.connection.encryptedPassword,
      appConfig.encryptionKey,
    );

    const driver = createDatabaseDriver(filter.connection, password);
    const sql = injectSourceQueryLimit(filter.sourceQuery);
    const result = await driver.runQuery(sql, 500, TIMEOUT_MS);

    // Extract options from the first column of the result
    const options = result.rows
      .map((row) => {
        const firstCol = result.columns[0];
        return firstCol !== undefined ? String(row[firstCol] ?? '') : '';
      })
      .filter((v) => v !== '');

    return {
      successMessage: SuccessMessages.getListSuccess('Filter options'),
      options,
    };
  }
}
