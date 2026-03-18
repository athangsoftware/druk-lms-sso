import { RequirePermission } from '../../rbac';
import { Controller, Put, HttpCode, HttpStatus, Body, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService } from '@app/prisma-sso';
import { UpdateIdentityProviderRequest } from './update-identity-provider-request';
import { UpdateIdentityProviderResponse } from './update-identity-provider-response';
import { SuccessMessages } from '../../../../core/models/message';
import { IdentityProviderService } from '../../identity-provider.service';

@ApiTags('Identity Provider')
@ApiBearerAuth()
@Controller('/identity-providers')
export class UpdateIdentityProviderController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly idpService: IdentityProviderService,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateIdentityProvider' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Identity provider successfully updated', type: UpdateIdentityProviderResponse })
  @RequirePermission('identity-provider.update')
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateIdentityProviderRequest,
  ): Promise<UpdateIdentityProviderResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const provider = await dbContext.identityProvider.findUnique({ where: { id } });

      if (!provider) {
        throw new HttpException('Identity provider not found', HttpStatus.NOT_FOUND);
      }

      const updateData: Record<string, any> = {};

      if (body.name !== undefined) updateData.name = body.name;
      if (body.type !== undefined) updateData.type = body.type;
      if (body.clientId !== undefined) updateData.clientId = body.clientId;
      if (body.authorizationUrl !== undefined) updateData.authorizationUrl = body.authorizationUrl;
      if (body.tokenUrl !== undefined) updateData.tokenUrl = body.tokenUrl;
      if (body.userInfoUrl !== undefined) updateData.userInfoUrl = body.userInfoUrl;
      if (body.redirectUrl !== undefined) updateData.redirectUrl = body.redirectUrl;
      if (body.scopes !== undefined) updateData.scopes = body.scopes;
      if (body.iconUrl !== undefined) updateData.iconUrl = body.iconUrl;
      if (body.isEnabled !== undefined) updateData.isEnabled = body.isEnabled;
      if (body.displayOrder !== undefined) updateData.displayOrder = body.displayOrder;
      if (body.metadata !== undefined) updateData.metadata = body.metadata;

      // Only update client secret if explicitly provided
      if (body.clientSecret !== undefined && body.clientSecret !== '') {
        updateData.clientSecret = this.idpService.encrypt(body.clientSecret);
      }

      await dbContext.identityProvider.update({
        where: { id },
        data: updateData,
      });

      this.idpService.invalidateCache();

      return { successMessage: SuccessMessages.updateSuccess('Identity Provider') };
    });
  }
}
