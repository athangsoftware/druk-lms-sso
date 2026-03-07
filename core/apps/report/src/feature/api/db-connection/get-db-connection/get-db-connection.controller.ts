import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { Role } from '@app/shared';
import { GetDbConnectionResponse } from './get-db-connection-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('DB Connections')
@ApiBearerAuth()
@Controller('/db-connections')
export class GetDbConnectionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getDbConnection' })
  @ApiResponse({ status: HttpStatus.OK, type: GetDbConnectionResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(@Param('id') id: string): Promise<GetDbConnectionResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const connection = await dbContext.dbConnection.findUnique({ where: { id } });
        if (!connection) {
          throw new NotFoundException('DB connection not found.');
        }

        return {
          successMessage: SuccessMessages.getSuccess('DB connection'),
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
      },
      { isTransaction: false },
    );
  }
}
