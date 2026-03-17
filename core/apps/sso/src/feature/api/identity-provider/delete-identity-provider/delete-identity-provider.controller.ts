import { Controller, Delete, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { DeleteIdentityProviderResponse } from './delete-identity-provider-response';
import { SuccessMessages } from '../../../../core/models/message';
import { IdentityProviderService } from '../../identity-provider.service';

@ApiTags('Identity Provider')
@ApiBearerAuth()
@Controller('/identity-providers')
export class DeleteIdentityProviderController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly idpService: IdentityProviderService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteIdentityProvider' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Identity provider successfully deleted', type: DeleteIdentityProviderResponse })
  @Authorize(UserType.MODRATOR)
  async execute(@Param('id') id: string): Promise<DeleteIdentityProviderResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const provider = await dbContext.identityProvider.findUnique({ where: { id } });

      if (!provider) {
        throw new HttpException('Identity provider not found', HttpStatus.NOT_FOUND);
      }

      await dbContext.identityProvider.delete({ where: { id } });

      this.idpService.invalidateCache();

      return { successMessage: SuccessMessages.deleteSuccess('Identity Provider') };
    });
  }
}
