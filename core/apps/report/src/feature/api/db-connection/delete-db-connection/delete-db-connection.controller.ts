import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { DeleteDbConnectionResponse } from './delete-db-connection-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('DB Connections')
@ApiBearerAuth()
@Controller('/db-connections')
export class DeleteDbConnectionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteDbConnection' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteDbConnectionResponse })
  @Authorize('dashboard.*')
  async execute(@Param('id') id: string): Promise<DeleteDbConnectionResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.dbConnection.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('DB connection not found.');
      }

      const chartsCount = await dbContext.chart.count({
        where: { connectionId: id },
      });

      if (chartsCount > 0) {
        throw new HttpException(
          `Cannot delete connection: ${chartsCount} chart(s) are using this connection. Please delete the charts first.`,
          HttpStatus.CONFLICT,
        );
      }

      await dbContext.dbConnection.delete({ where: { id } });

      return {
        successMessage: SuccessMessages.deleteSuccess('DB connection'),
      };
    });
  }
}
