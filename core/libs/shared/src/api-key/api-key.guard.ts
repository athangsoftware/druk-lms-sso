import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiKeyService } from './api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    @Inject('AUTH_HEADER_KEY') private readonly authHeaderKey: string,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers[this.authHeaderKey.toLowerCase()] as string;

    if (!apiKey || !this.apiKeyService.validateApiKey(apiKey)) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
