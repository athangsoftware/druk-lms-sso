import { Controller, Get, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, Role } from '@app/prisma';
import { GetClientResponse } from './get-client-response';
import { SuccessMessages } from '../../../../core/models/message';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('/clients')
export class GetClientController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getClient' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns client by ID', type: GetClientResponse })
  @Authorize(Role.MODRATOR)
  async execute(@Param('id') id: string): Promise<GetClientResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const client = await dbContext.client.findUnique({
        where: { id },
        include: { redirectUrls: true, postLogoutRedirectUrls: true },
      });

      if (!client) {
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }

      return {
        successMessage: SuccessMessages.getSuccess('Client'),
        data: {
          id: client.id,
          name: client.name,
          clientId: client.clientId,
          clientSecret: client.clientSecret ?? null,
          clientType: client.clientType,
          disableStrictUrlValidation: client.disableStrictUrlValidation,
          redirectUrls: client.redirectUrls.map((r) => r.url),
          postLogoutRedirectUrls: client.postLogoutRedirectUrls.map((r) => r.url),
          createdAt: client.createdAt.toISOString(),
        },
      };
    });
  }
}
