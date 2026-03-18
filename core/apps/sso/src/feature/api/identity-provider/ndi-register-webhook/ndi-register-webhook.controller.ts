import { RequirePermission } from '../../rbac';
import { Controller, Post, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserType } from '@app/prisma-sso';
import { BhutanNdiService } from '../../bhutan-ndi.service';

@ApiTags('Identity Provider')
@ApiBearerAuth()
@Controller('/identity-providers/ndi')
export class NdiRegisterWebhookController {
  private readonly logger = new Logger(NdiRegisterWebhookController.name);

  constructor(private readonly bhutanNdiService: BhutanNdiService) {}

  @Post('register-webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'ndiRegisterWebhook' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registers the NDI webhook' })
  @RequirePermission('identity-provider.update')
  async execute(): Promise<{ successMessage: string; data?: any }> {
    this.logger.log('Admin triggered NDI webhook registration');

    const accessToken = await this.bhutanNdiService.authenticate();
    const result = await this.bhutanNdiService.registerWebhook(accessToken);

    return {
      successMessage: 'NDI webhook registered successfully',
      data: result,
    };
  }
}
