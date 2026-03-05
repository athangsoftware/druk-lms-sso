import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { ApiKeyGuard } from './api-key.guard';

export function ApiKeyAuthorization() {
  return applyDecorators(
    UseGuards(ApiKeyGuard),
    ApiHeader({
      name: 'x-api-key',
      description: 'API Key required to access this endpoint',
      required: true,
    }),
  );
}
