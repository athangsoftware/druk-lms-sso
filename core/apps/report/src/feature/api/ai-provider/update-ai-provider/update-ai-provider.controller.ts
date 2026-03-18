import {
  Controller,
  Put,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { UpdateAiProviderRequest } from './update-ai-provider-request';
import { UpdateAiProviderResponse } from './update-ai-provider-response';
import { SuccessMessages } from '../../../../core/models/message';
import { encrypt } from '../../../../core/utils/encryption.util';

@ApiTags('AI Providers')
@ApiBearerAuth()
@Controller('/ai-providers')
export class UpdateAiProviderController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateAiProvider' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateAiProviderResponse })
  @Authorize('user.read')
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateAiProviderRequest,
  ): Promise<UpdateAiProviderResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.aiProvider.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('AI provider not found.');
      }

      const appConfig = this.configService.get<AppConfig>('app')!;
      const encryptedApiKey = body.apiKey
        ? encrypt(body.apiKey, appConfig.encryptionKey)
        : undefined;

      const provider = await dbContext.aiProvider.update({
        where: { id },
        data: {
          ...(body.name !== undefined && { name: body.name }),
          ...(body.model !== undefined && { model: body.model }),
          ...(encryptedApiKey !== undefined && { encryptedApiKey }),
          ...(body.isEnabled !== undefined && { isEnabled: body.isEnabled }),
        },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('AI provider'),
        data: {
          id: provider.id,
          name: provider.name,
          model: provider.model,
          isEnabled: provider.isEnabled,
          createdAt: provider.createdAt,
        },
      };
    });
  }
}
