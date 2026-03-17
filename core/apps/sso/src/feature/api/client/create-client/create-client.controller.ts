import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { CreateClientRequest } from './create-client-request';
import { CreateClientResponse } from './create-client-response';
import { SuccessMessages } from '../../../../core/models/message';
import { randomUUID } from 'crypto';

function toOidcClientId(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^a-z0-9]+/g, '-')     // non-alphanumeric → hyphen
    .replace(/^-+|-+$/g, '')          // trim leading/trailing hyphens
    || 'client';
}

@ApiTags('Client')
@ApiBearerAuth()
@Controller('/clients')
export class CreateClientController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createClient' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Client successfully created', type: CreateClientResponse })
  @Authorize(UserType.MODRATOR)
  async execute(@Body() body: CreateClientRequest): Promise<CreateClientResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const clientId = body.clientId ?? toOidcClientId(body.name);
      const isConfidential = body.clientType === 'CONFIDENTIAL';
      const clientSecret = isConfidential ? randomUUID() : null;

      const existing = await dbContext.client.findUnique({ where: { clientId } });
      if (existing) {
        throw new HttpException(
          `Client ID "${clientId}" is already in use. Please choose a different name or edit the Client ID.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const client = await dbContext.client.create({
        data: {
          name: body.name,
          clientId,
          clientSecret,
          clientType: (body.clientType ?? 'PUBLIC') as any,
          disableStrictUrlValidation: body.disableStrictUrlValidation ?? false,
          redirectUrls: {
            create: (body.redirectUrls ?? []).map((url) => ({ url })),
          },
          postLogoutRedirectUrls: {
            create: (body.postLogoutRedirectUrls ?? []).map((url) => ({ url })),
          },
        },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Client'),
        data: {
          id: client.id,
          name: client.name,
          clientId: client.clientId,
          clientSecret: client.clientSecret ?? null,
          clientType: client.clientType,
        },
      };
    });
  }
}
