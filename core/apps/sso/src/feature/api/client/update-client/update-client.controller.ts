import { Controller, Put, HttpCode, HttpStatus, Body, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { UpdateClientRequest } from './update-client-request';
import { UpdateClientResponse } from './update-client-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('/clients')
export class UpdateClientController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateClient' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Client successfully updated', type: UpdateClientResponse })
  @Authorize(UserType.MODRATOR)
  async execute(@Param('id') id: string, @Body() body: UpdateClientRequest): Promise<UpdateClientResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const client = await dbContext.client.findUnique({ where: { id } });

      if (!client) {
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }

      await dbContext.client.update({
        where: { id },
        data: {
          ...(body.name !== undefined && { name: body.name }),
          ...(body.clientType !== undefined && { clientType: body.clientType as any }),
          ...(body.disableStrictUrlValidation !== undefined && {
            disableStrictUrlValidation: body.disableStrictUrlValidation,
          }),
        },
      });

      if (body.redirectUrls !== undefined) {
        await dbContext.redirectURL.deleteMany({ where: { clientId: id } });
        if (body.redirectUrls.length > 0) {
          await dbContext.redirectURL.createMany({
            data: body.redirectUrls.map((url) => ({ url, clientId: id })),
          });
        }
      }

      if (body.postLogoutRedirectUrls !== undefined) {
        await dbContext.postLogoutRedirectURL.deleteMany({ where: { clientId: id } });
        if (body.postLogoutRedirectUrls.length > 0) {
          await dbContext.postLogoutRedirectURL.createMany({
            data: body.postLogoutRedirectUrls.map((url) => ({ url, clientId: id })),
          });
        }
      }

      return { successMessage: SuccessMessages.updateSuccess('Client') };
    });
  }
}
