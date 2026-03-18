import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthHelperService } from './auth-helper.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthHelperService);
  const router = inject(Router);
  const requiredPermissions = route.data?.['permissions'] as string[] | undefined;

  if (state.url === '/' || state.url.startsWith('/?') || state.url === '/callback' || state.url.startsWith('/callback?')) {
    return true;
  }

  if (!authService.isUserLogged()) {
    authService.storeRedirectUrl(window.location.href);
    return router.createUrlTree(['/callback'], { queryParams: {} });
  }

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }

  const hasAccess = requiredPermissions.some((perm) => authService.hasPermission(perm));
  if (hasAccess) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
