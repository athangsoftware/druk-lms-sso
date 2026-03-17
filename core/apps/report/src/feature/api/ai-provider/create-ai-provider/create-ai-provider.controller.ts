import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../../config';
import { CreateAiProviderRequest } from './create-ai-provider-request';
import { CreateAiProviderResponse } from './create-ai-provider-response';
import { SuccessMessages } from '../../../../core/models/message';
import { encrypt } from '../../../../core/utils/encryption.util';

@ApiTags('AI Providers')
@ApiBearerAuth()
@Controller('/ai-providers')
export class CreateAiProviderController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createAiProvider' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateAiProviderResponse })
  @Authorize(UserType.MEMBER, UserType.MODRATOR, UserType.DEV, UserType.SUPER_ADMIN)
  async execute(
    @Body() body: CreateAiProviderRequest,
  ): Promise<CreateAiProviderResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const appConfig = this.configService.get<AppConfig>('app')!;
      const encryptedApiKey = encrypt(body.apiKey, appConfig.encryptionKey);

      const provider = await dbContext.aiProvider.create({
        data: {
          name: body.name,
          model: body.model,
          encryptedApiKey,
          isEnabled: body.isEnabled ?? false,
        },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('AI provider'),
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
