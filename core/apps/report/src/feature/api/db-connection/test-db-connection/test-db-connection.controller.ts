import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { TestDbConnectionResponse } from './test-db-connection-response';
import { decrypt } from '../../../../core/utils/encryption.util';
import { createDatabaseDriver } from '../../../../core/drivers/database-driver.factory';

@ApiTags('DB Connections')
@ApiBearerAuth()
@Controller('/db-connections')
export class TestDbConnectionController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Post(':id/test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'testDbConnection' })
  @ApiResponse({ status: HttpStatus.OK, type: TestDbConnectionResponse })
  @Authorize('dashboard.*')
  async execute(@Param('id') id: string): Promise<TestDbConnectionResponse> {
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
    const isConnected = await driver.testConnection();

    return {
      successMessage: isConnected
        ? 'Connection test successful.'
        : 'Connection test failed. Please check your credentials.',
      data: { isConnected },
    };
  }
}
