import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { AuthorizeGuard } from './authorize.guard';

export function Authorize(...access: string[]) {
  return applyDecorators(
    SetMetadata('auth_key', access),
    UseGuards(JwtAuthGuard, AuthorizeGuard),
  );
}
