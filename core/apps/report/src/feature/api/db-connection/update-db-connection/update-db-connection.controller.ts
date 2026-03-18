import {
  Controller,
  Put,
  HttpCode,
  HttpStatus,
  Body,
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
import { UpdateDbConnectionRequest } from './update-db-connection-request';
import { UpdateDbConnectionResponse } from './update-db-connection-response';
import { SuccessMessages } from '../../../../core/models/message';
import { encrypt } from '../../../../core/utils/encryption.util';

@ApiTags('DB Connections')
@ApiBearerAuth()
@Controller('/db-connections')
export class UpdateDbConnectionController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateDbConnection' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateDbConnectionResponse })
  @Authorize('user.read')
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateDbConnectionRequest,
  ): Promise<UpdateDbConnectionResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.dbConnection.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('DB connection not found.');
      }

      const appConfig = this.configService.get<AppConfig>('app')!;
      const encryptedPassword = body.password
        ? encrypt(body.password, appConfig.encryptionKey)
        : undefined;

      const connection = await dbContext.dbConnection.update({
        where: { id },
        data: {
          ...(body.name && { name: body.name }),
          ...(body.dbType && { dbType: body.dbType }),
          ...(body.host && { host: body.host }),
          ...(body.port !== undefined && { port: body.port }),
          ...(body.databaseName && { databaseName: body.databaseName }),
          ...(body.username && { username: body.username }),
          ...(encryptedPassword && { encryptedPassword }),
        },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('DB connection'),
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
