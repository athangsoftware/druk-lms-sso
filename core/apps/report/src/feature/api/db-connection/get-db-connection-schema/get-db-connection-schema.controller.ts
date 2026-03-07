import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { GetDbConnectionSchemaResponse } from './get-db-connection-schema-response';
import { decrypt } from '../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../core/drivers/database-driver.factory';

@ApiTags('DB Connections')
@ApiBearerAuth()
@Controller('/db-connections')
export class GetDbConnectionSchemaController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Get(':id/schema')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getDbConnectionSchema' })
  @ApiResponse({ status: HttpStatus.OK, type: GetDbConnectionSchemaResponse })
  @Authorize(Role.MEMBER)
  async execute(@Param('id') id: string): Promise<GetDbConnectionSchemaResponse> {
    const connection = await this.prismaService.client(
      async ({ dbContext }) => {
        const conn = await dbContext.dbConnection.findUnique({ where: { id } });
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

    return {
      successMessage: 'Schema retrieved successfully.',
      data: schema.tables.map((t) => ({
        tableName: t.tableName,
        columns: t.columns.map((c) => ({
          columnName: c.columnName,
          dataType: c.dataType,
          isNullable: c.isNullable,
        })),
      })),
    };
  }
}
