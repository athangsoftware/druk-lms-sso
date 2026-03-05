import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyService {
  constructor(
    @Inject('API_SECRET_KEY') private readonly secretKey: string,
    @Inject('AUTH_HEADER_KEY') private readonly authHeaderKey: string,
  ) {}

  validateApiKey(apiKey: string): boolean {
    return apiKey === this.secretKey;
  }

  getAuthHeaderKey(): string {
    return this.authHeaderKey;
  }
}
