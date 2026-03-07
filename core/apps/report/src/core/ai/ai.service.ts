import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/prisma';
import { AppConfig } from '../../config';
import { AiProviderBase, AiChartResult } from './ai-provider.interface';
import { OpenAiProvider } from './openai.provider';
import { decrypt } from '../utils/encryption.util';
import { SchemaMetadata } from '../drivers/database-driver.interface';

@Injectable()
export class AiService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private async getProvider(): Promise<AiProviderBase> {
    const provider = await this.prismaService.client(
      async ({ dbContext }) => {
        return dbContext.aiProvider.findFirst({
          where: { isEnabled: true },
          orderBy: { createdAt: 'asc' },
        });
      },
      { isTransaction: false },
    );

    if (!provider) {
      throw new Error(
        'No AI provider is configured or enabled. Please add an AI provider in settings.',
      );
    }

    const appConfig = this.configService.get<AppConfig>('app')!;
    const apiKey = decrypt(provider.encryptedApiKey, appConfig.encryptionKey);

    return new OpenAiProvider(apiKey, appConfig.openAiModel ?? 'gpt-4o');
  }

  async generateChart(
    prompt: string,
    schema: SchemaMetadata,
  ): Promise<AiChartResult> {
    const provider = await this.getProvider();
    return provider.generateChart(prompt, schema);
  }

  async modifyChart(
    prompt: string,
    existingConfig: Record<string, unknown>,
    schema: SchemaMetadata,
  ): Promise<AiChartResult> {
    const provider = await this.getProvider();
    return provider.modifyChart(prompt, existingConfig, schema);
  }
}
