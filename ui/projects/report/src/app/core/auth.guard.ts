import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthHelperService } from './auth-helper.service';
import { OAuthService } from './oauth.service';

export const authGuard: CanActivateFn = async (_route, _state) => {
  const authService = inject(AuthHelperService);
  const oauthService = inject(OAuthService);

  if (authService.isUserLogged()) {
    return true;
  }

  await oauthService.initOAuthFlow();
  return false;
};
