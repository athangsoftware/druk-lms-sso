import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthHelperService } from './auth-helper.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthHelperService);
  const router = inject(Router);
  const requiredRoles = route.data?.['roles'] as string[] | undefined;

  if (state.url === '/' || state.url.startsWith('/?') || state.url === '/callback' || state.url.startsWith('/callback?')) {
    return true;
  }

  if (!authService.isUserLogged()) {
    authService.storeRedirectUrl(window.location.href);
    return router.createUrlTree(['/callback'], { queryParams: {} });
  }

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const token = authService.getAccessToken();
  if (!token) {
    return router.createUrlTree(['/unauthorized']);
  }

  const decoded = authService.decodeToken(token);
  const userRole = decoded?.role?.toLowerCase();
  const normalizedRoles = requiredRoles.map((role) => role.toLowerCase());

  if (userRole && normalizedRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
