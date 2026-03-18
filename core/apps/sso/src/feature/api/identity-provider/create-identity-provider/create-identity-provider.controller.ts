import { RequirePermission } from '../../rbac';
import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService } from '@app/prisma-sso';
import { CreateIdentityProviderRequest } from './create-identity-provider-request';
import { CreateIdentityProviderResponse } from './create-identity-provider-response';
import { SuccessMessages } from '../../../../core/models/message';
import { IdentityProviderService } from '../../identity-provider.service';

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'provider';
}

@ApiTags('Identity Provider')
@ApiBearerAuth()
@Controller('/identity-providers')
export class CreateIdentityProviderController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly idpService: IdentityProviderService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createIdentityProvider' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Identity provider successfully created', type: CreateIdentityProviderResponse })
  @RequirePermission('identity-provider.create')
  async execute(@Body() body: CreateIdentityProviderRequest): Promise<CreateIdentityProviderResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const slug = body.slug ?? toSlug(body.name);

      const existing = await dbContext.identityProvider.findUnique({ where: { slug } });
      if (existing) {
        throw new HttpException(
          `Identity provider with slug "${slug}" already exists. Please choose a different name or slug.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const encryptedSecret = body.clientSecret
        ? this.idpService.encrypt(body.clientSecret)
        : null;

      const provider = await dbContext.identityProvider.create({
        data: {
          name: body.name,
          slug,
          type: (body.type ?? 'OIDC') as any,
          clientId: body.clientId ?? null,
          clientSecret: encryptedSecret,
          authorizationUrl: body.authorizationUrl ?? null,
          tokenUrl: body.tokenUrl ?? null,
          userInfoUrl: body.userInfoUrl ?? null,
          redirectUrl: body.redirectUrl ?? null,
          scopes: body.scopes ?? null,
          iconUrl: body.iconUrl ?? null,
          isEnabled: body.isEnabled ?? true,
          displayOrder: body.displayOrder ?? 0,
          metadata: body.metadata ?? undefined,
        },
      });

      this.idpService.invalidateCache();

      return {
        successMessage: SuccessMessages.insertSuccess('Identity Provider'),
        data: {
          id: provider.id,
          name: provider.name,
          slug: provider.slug,
          type: provider.type,
          isEnabled: provider.isEnabled,
        },
      };
    });
  }
}
