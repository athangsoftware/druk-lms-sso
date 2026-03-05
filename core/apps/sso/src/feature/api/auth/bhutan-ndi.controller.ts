import { Controller, Post, Body, Get, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BhutanNdiService } from '../bhutan-ndi.service';

@Controller('ndi')
export class BhutanNdiController {
  constructor(
    private readonly bhutanNdiService: BhutanNdiService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register-webhook')
  async createProofRequest(): Promise<any> {
    try {
      const accessToken = await this.bhutanNdiService.authenticate();
      await this.bhutanNdiService.registerWebhook(accessToken);
    } catch (error) {
      throw new HttpException(
        'Failed to process proof request: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('webhook')
  async handleWebhook(
    @Body() payload: any,
    @Headers('authorization') authHeader: string,
  ): Promise<{ statusCode: number; message: string }> {
    console.log('Received webhook payload:', payload);
    return { statusCode: 202, message: 'Accepted' };
  }

  @Get('webhook-responses')
  async getWebhookResponses(): Promise<any[]> {
    return this.bhutanNdiService.getWebhookResponses();
  }
}
