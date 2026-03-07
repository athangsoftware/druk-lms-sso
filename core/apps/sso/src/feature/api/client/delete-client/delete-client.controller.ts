import { Controller, Delete, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, Role } from '@app/prisma-sso';
import { DeleteClientResponse } from './delete-client-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('/clients')
export class DeleteClientController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteClient' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Client successfully deleted', type: DeleteClientResponse })
  @Authorize(Role.MODRATOR)
  async execute(@Param('id') id: string): Promise<DeleteClientResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const client = await dbContext.client.findUnique({ where: { id } });

      if (!client) {
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }

      await dbContext.redirectURL.deleteMany({ where: { clientId: id } });
      await dbContext.postLogoutRedirectURL.deleteMany({ where: { clientId: id } });
      await dbContext.client.delete({ where: { id } });

      return { successMessage: SuccessMessages.deleteSuccess('Client') };
    });
  }
}
