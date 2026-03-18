import { RequirePermission } from '../../rbac';
import { Controller, Put, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService, UserType } from '@app/prisma-sso';
import { ToggleIdentityProviderResponse } from './toggle-identity-provider-response';
import { IdentityProviderService } from '../../identity-provider.service';

@ApiTags('Identity Provider')
@ApiBearerAuth()
@Controller('/identity-providers')
export class ToggleIdentityProviderController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly idpService: IdentityProviderService,
  ) {}

  @Put(':id/toggle')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'toggleIdentityProvider' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Identity provider toggled', type: ToggleIdentityProviderResponse })
  @RequirePermission('identity-provider.update')
  async execute(@Param('id') id: string): Promise<ToggleIdentityProviderResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const provider = await dbContext.identityProvider.findUnique({ where: { id } });

      if (!provider) {
        throw new HttpException('Identity provider not found', HttpStatus.NOT_FOUND);
      }

      const newState = !provider.isEnabled;

      await dbContext.identityProvider.update({
        where: { id },
        data: { isEnabled: newState },
      });

      this.idpService.invalidateCache();

      return {
        successMessage: `Identity Provider has been ${newState ? 'enabled' : 'disabled'} successfully`,
      };
    });
  }
}
