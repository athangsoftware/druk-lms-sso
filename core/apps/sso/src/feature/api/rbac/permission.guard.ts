import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './require-permission.decorator';
import { RbacService } from './rbac.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbacService: RbacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.sub) {
      throw new ForbiddenException('Access denied: user not authenticated');
    }

    // Check if user has permissions from JWT payload first (cached)
    if (user.permissions && Array.isArray(user.permissions)) {
      const hasPermission = requiredPermissions.some((perm) =>
        this.matchesPermission(user.permissions, perm),
      );
      if (hasPermission) return true;
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    // Fallback: resolve permissions from database
    const userPermissions = await this.rbacService.getUserPermissions(user.sub);
    const hasPermission = requiredPermissions.some((perm) =>
      this.matchesPermission(userPermissions, perm),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }

  private matchesPermission(userPermissions: string[], required: string): boolean {
    if (userPermissions.includes(required)) return true;
    const [resource] = required.split('.');
    return userPermissions.includes(`${resource}.*`);
  }
}
