import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { AppConfig } from '../../config';

interface NdiConfig {
  clientId: string;
  clientSecret: string;
  fixedAccessToken: string;
  webhookUrl: string;
  authUrl: string;
  verifierUrl: string;
  webhookRegisterUrl: string;
  webhookSubscribeUrl: string;
}

@Injectable()
export class BhutanNdiService {
  private readonly logger = new Logger(BhutanNdiService.name);
  private webhookResponses: any[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getNdiConfig(): NdiConfig {
    const config = this.configService.get<AppConfig>('app');
    if (!config || !config.ndiConfig) {
      this.logger.error('NDI configuration is missing');
      throw new HttpException('NDI configuration is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const webhookUrl = config.ndiConfig.webhookUrl;
    try {
      new URL(webhookUrl);
    } catch (error) {
      this.logger.error(`Invalid webhook URL: ${webhookUrl}`);
      throw new HttpException(`Invalid webhook URL: ${webhookUrl}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return config.ndiConfig;
  }

  async authenticate(): Promise<string> {
    const config = this.getNdiConfig();
    const payload = {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'client_credentials',
    };

    this.logger.log('Attempting authentication with payload:', {
      ...payload,
      client_secret: '[REDACTED]',
    });

    try {
      const response = await firstValueFrom(
        this.httpService.post(config.authUrl, payload, {
          headers: { 'Content-Type': 'application/json', accept: '*/*' },
        }),
      );
      this.logger.log('Authentication successful');
      return response.data.access_token;
    } catch (error) {
      this.logger.error('Authentication failed:', error.message);
      throw new HttpException('Authentication failed: ' + error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async createProofRequest(accessToken: string): Promise<any> {
    const config = this.getNdiConfig();
    const payload = {
      proofName: 'Verify Foundational ID',
      proofAttributes: [
        {
          name: 'ID Number',
          restrictions: [
            {
              schema_name:
                'https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076',
            },
          ],
        },
        {
          name: 'Full Name',
          restrictions: [
            {
              schema_name:
                'https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076',
            },
          ],
        },
      ],
    };

    this.logger.log('Creating proof request with payload:', payload);

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${config.verifierUrl}/v1/proof-request`, payload, {
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );
      this.logger.log('Proof request created successfully:', response.data);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to create proof request:', error.message);
      throw new HttpException(
        'Failed to create proof request: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registerWebhook(accessToken: string): Promise<any> {
    const config = this.getNdiConfig();
    const payload = {
      webhookId: 'WEBHOOK_DEMO_DEV_1',
      webhookURL: config.webhookUrl,
      authentication: {
        type: 'OAuth2',
        version: 'v2',
        data: { token: config.fixedAccessToken },
      },
    };

    this.logger.log('Registering webhook with payload:', {
      ...payload,
      authentication: { ...payload.authentication, data: { token: '[REDACTED]' } },
    });

    const maxRetries = 3;
    let attempt = 1;

    while (attempt <= maxRetries) {
      try {
        const response = await firstValueFrom(
          this.httpService.post(config.webhookRegisterUrl, payload, {
            headers: {
              'Content-Type': 'application/json',
              accept: '*/*',
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        );
        this.logger.log('Webhook registered successfully:', response.data);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        this.logger.error(`Webhook registration failed (attempt ${attempt}/${maxRetries}):`, {
          message: axiosError.message,
          response: axiosError.response?.data,
          status: axiosError.response?.status,
        });

        if (attempt === maxRetries) {
          throw new HttpException(
            `Failed to register webhook after ${maxRetries} attempts: ${axiosError.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  async subscribeWebhook(accessToken: string, threadId: string, webhookId: string): Promise<any> {
    const config = this.getNdiConfig();
    const payload = { webhookId, threadId };

    this.logger.log('Subscribing webhook with payload:', payload);

    try {
      const response = await firstValueFrom(
        this.httpService.post(config.webhookSubscribeUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );
      this.logger.log('Webhook subscribed successfully:', response.data);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to subscribe webhook:', error.message);
      throw new HttpException(
        'Failed to subscribe webhook: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  storeWebhookResponse(payload: any): void {
    this.logger.log('Storing webhook response:', payload);
    this.webhookResponses.push({ timestamp: new Date(), payload });
  }

  getWebhookResponses(): any[] {
    return this.webhookResponses;
  }
}
