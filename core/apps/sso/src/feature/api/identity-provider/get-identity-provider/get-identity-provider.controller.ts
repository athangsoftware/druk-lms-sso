import { RequirePermission } from '../../rbac';
import { Controller, Get, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService, UserType } from '@app/prisma-sso';
import { GetIdentityProviderResponse } from './get-identity-provider-response';
import { SuccessMessages } from '../../../../core/models/message';
import { IdentityProviderService } from '../../identity-provider.service';

@ApiTags('Identity Provider')
@ApiBearerAuth()
@Controller('/identity-providers')
export class GetIdentityProviderController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly idpService: IdentityProviderService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getIdentityProvider' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns identity provider by ID', type: GetIdentityProviderResponse })
  @RequirePermission('identity-provider.read')
  async execute(@Param('id') id: string): Promise<GetIdentityProviderResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const provider = await dbContext.identityProvider.findUnique({ where: { id } });

      if (!provider) {
        throw new HttpException('Identity provider not found', HttpStatus.NOT_FOUND);
      }

      return {
        successMessage: SuccessMessages.getSuccess('Identity Provider'),
        data: {
          id: provider.id,
          name: provider.name,
          slug: provider.slug,
          type: this.idpService.normalizeProviderType(provider),
          clientId: provider.clientId,
          authorizationUrl: provider.authorizationUrl,
          tokenUrl: provider.tokenUrl,
          userInfoUrl: provider.userInfoUrl,
          redirectUrl: provider.redirectUrl,
          scopes: provider.scopes,
          iconUrl: provider.iconUrl,
          isEnabled: provider.isEnabled,
          displayOrder: provider.displayOrder,
          metadata: provider.metadata,
          hasClientSecret: !!provider.clientSecret,
          createdAt: provider.createdAt.toISOString(),
        },
      };
    });
  }
}
