import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { Role } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { CreateDbConnectionRequest } from './create-db-connection-request';
import { CreateDbConnectionResponse } from './create-db-connection-response';
import { SuccessMessages } from '../../../../core/models/message';
import { encrypt } from '../../../../core/utils/encryption.util';

@ApiTags('DB Connections')
@ApiBearerAuth()
@Controller('/db-connections')
export class CreateDbConnectionController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createDbConnection' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateDbConnectionResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Body() body: CreateDbConnectionRequest,
  ): Promise<CreateDbConnectionResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const appConfig = this.configService.get<AppConfig>('app')!;
      const encryptedPassword = encrypt(body.password, appConfig.encryptionKey);

      const connection = await dbContext.dbConnection.create({
        data: {
          name: body.name,
          dbType: body.dbType,
          host: body.host,
          port: body.port,
          databaseName: body.databaseName,
          username: body.username,
          encryptedPassword,
        },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('DB connection'),
        data: {
          id: connection.id,
          name: connection.name,
          dbType: connection.dbType,
          host: connection.host,
          port: connection.port,
          databaseName: connection.databaseName,
          username: connection.username,
          createdAt: connection.createdAt,
        },
      };
    });
  }
}
