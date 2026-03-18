import { RequirePermission } from '../../rbac';
import { Controller, Post, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserType } from '@app/prisma-sso';
import { BhutanNdiService } from '../../bhutan-ndi.service';

@ApiTags('Identity Provider')
@ApiBearerAuth()
@Controller('/identity-providers/ndi')
export class NdiTestConnectionController {
  private readonly logger = new Logger(NdiTestConnectionController.name);

  constructor(private readonly bhutanNdiService: BhutanNdiService) {}

  @Post('test-connection')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'ndiTestConnection' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Tests NDI connection by authenticating' })
  @RequirePermission('identity-provider.list')
  async execute(): Promise<{ successMessage: string; data: { connected: boolean } }> {
    this.logger.log('Admin triggered NDI connection test');

    await this.bhutanNdiService.authenticate();

    return {
      successMessage: 'NDI connection successful',
      data: { connected: true },
    };
  }
}
