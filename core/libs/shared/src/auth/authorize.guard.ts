import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export interface AuthorizeGuardConfig {
  userAccessControlKey: string;
  getCurrentUser: (context: ExecutionContext) => any;
}

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('AUTH_OPTIONS') private config: AuthorizeGuardConfig,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredAccess = this.reflector.getAllAndOverride<string[]>(
      'auth_key',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredAccess) {
      return true;
    }

    const user = this.config.getCurrentUser(context);
    if (!user) {
      return false;
    }
    let userAccess = user[this.config.userAccessControlKey];
    if (typeof userAccess === 'string') {
      userAccess = [userAccess];
    }

    const hasMatch = requiredAccess.some((required) =>
      this.matchesAccess(userAccess, required),
    );

    if (hasMatch) {
      return true;
    }

    // Fallback: check if the user has a permissions array (e.g., RBAC permissions)
    const permissions = (user as any).permissions;
    if (Array.isArray(permissions)) {
      return requiredAccess.some((required) =>
        this.matchesAccess(permissions, required),
      );
    }

    return false;
  }

  private matchesAccess(
    accessValue: string | string[] | undefined,
    requiredAccess: string,
  ): boolean {
    if (!accessValue) {
      return false;
    }

    const accesses = Array.isArray(accessValue) ? accessValue : [accessValue];

    return accesses.some((access) => {
      if (access === requiredAccess) {
        return true;
      }
      if (access === '*' || access === '.*') {
        return true;
      }
      if (access.endsWith('.*')) {
        const prefix = access.slice(0, -2);
        return requiredAccess.startsWith(`${prefix}.`);
      }
      return false;
    });
  }
}
