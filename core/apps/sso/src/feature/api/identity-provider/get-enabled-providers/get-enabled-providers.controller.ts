import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdentityProviderService } from '../../identity-provider.service';

@ApiTags('Identity Provider')
@Controller('/identity-providers')
export class GetEnabledProvidersController {
  constructor(private readonly idpService: IdentityProviderService) {}

  @Get('enabled')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getEnabledIdentityProviders' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns enabled identity providers for login screen' })
  async execute(): Promise<any> {
    const providers = await this.idpService.getEnabledProviders();
    return { data: providers };
  }
}
