import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/shared';
import { PermissionGuard } from './permission.guard';

export const PERMISSION_KEY = 'required_permission';

/**
 * Decorator for API-level permission enforcement.
 * Format: "resource.action" (e.g., "user.create", "role.assign")
 *
 * @example
 * @RequirePermission('user.create')
 * async createUser() { ... }
 */
export function RequirePermission(...permissions: string[]) {
  return applyDecorators(
    SetMetadata(PERMISSION_KEY, permissions),
    UseGuards(JwtAuthGuard, PermissionGuard),
  );
}
