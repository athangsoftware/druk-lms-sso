import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

// Client
import { GetClientListController } from './client/get-client-list/get-client-list.controller';
import { GetClientController } from './client/get-client/get-client.controller';
import { CreateClientController } from './client/create-client/create-client.controller';
import { UpdateClientController } from './client/update-client/update-client.controller';
import { DeleteClientController } from './client/delete-client/delete-client.controller';

// Auth
import { BhutanNdiController } from './auth/bhutan-ndi.controller';
import { BhutanNdiSignInController } from './auth/bhutan-ndi-sign-in/bhutan-ndi-sign-in.controller';
import { BhutanNdiCallbackController } from './auth/bhutan-ndi-callback/bhutan-ndi-callback.controller';
import { NdiStatusController } from './auth/bhutan-ndi-status/bhutan-ndi-status.controller';
import { ForgotPasswordController } from './auth/forgot-password/forgot-password.controller';
import { GoogleSignInCallbackController } from './auth/google-sign-in-callback/google-sign-in-callback.controller';
import { GoogleSignInController } from './auth/google-sign-in/google-sign-in.controller';
import { LoginController } from './auth/login/login.controller';

// External
import { CreateUserExternalController } from './external/create-user-external/create-user-external.controller';
import { CreateUserWithPasswordExternalController } from './external/create-user-with-password-external/create-user-with-password-external.controller';
import { ChangePasswordExternalController } from './external/change-password-external/change-password-external.controller';
import { DeleteUserExternalController } from './external/delete-user-external/delete-user-external.controller';
import { GenerateSetPasswordLinkController } from './external/generate-set-password-link/generate-set-password-link.controller';
import { UpdateUserExternalController } from './external/update-user-external/update-user-external.controller';

// OIDC
import { AuthorizeController } from './oidc/authorize/authorize.controller';
import { ConfigurationController } from './oidc/configuration/configuration.controller';
import { UserInfoController } from './oidc/info/info.controller';
import { JwksController } from './oidc/jwks/jwks.controller';
import { LogoutController } from './oidc/logout/logout.controller';
import { SessionController } from './oidc/session-check/session-check.controller';
import { TokenController } from './oidc/token/token.controller';

// User
import { CreateUserController } from './user/create-user/create-user.controller';
import { DisableUserController } from './user/disable-user/disable-user.controller';
import { EnableUserController } from './user/enable-user/enable-user.controller';
import { GetRoleListController } from './user/get-role-list/get-role-list.controller';
import { GetUserListController } from './user/get-user-list/get-user-list.controller';
import { GetUserSelfController } from './user/get-user-self/get-user-self.controller';
import { GetUserController } from './user/get-user/get-user.controller';
import { ResetPasswordController } from './user/reset-password/reset-password.controller';
import { SetPasswordController } from './user/set-password/set-password.controller';
import { UpdateUserSelfController } from './user/update-user-self/update-user-self.controller';
import { UpdateUserController } from './user/update-user/update-user.controller';

// Dashboard
import { DashboardController } from './dashboard/dashboard.controller';

// Identity Provider
import { GetIdentityProviderListController } from './identity-provider/get-identity-provider-list/get-identity-provider-list.controller';
import { GetIdentityProviderController } from './identity-provider/get-identity-provider/get-identity-provider.controller';
import { CreateIdentityProviderController } from './identity-provider/create-identity-provider/create-identity-provider.controller';
import { UpdateIdentityProviderController } from './identity-provider/update-identity-provider/update-identity-provider.controller';
import { DeleteIdentityProviderController } from './identity-provider/delete-identity-provider/delete-identity-provider.controller';
import { ToggleIdentityProviderController } from './identity-provider/toggle-identity-provider/toggle-identity-provider.controller';
import { GetEnabledProvidersController } from './identity-provider/get-enabled-providers/get-enabled-providers.controller';

// Services
import { OAuthService } from './auth.service';
import { BhutanNdiService } from './bhutan-ndi.service';
import { LogoutService } from './oidc/logout/logout.service';
import { IdentityProviderService } from './identity-provider.service';

const CONTROLLERS = [
  // Client
  GetClientListController,
  GetClientController,
  CreateClientController,
  UpdateClientController,
  DeleteClientController,
  // Auth
  BhutanNdiController,
  BhutanNdiSignInController,
  BhutanNdiCallbackController,
  NdiStatusController,
  ForgotPasswordController,
  GoogleSignInCallbackController,
  GoogleSignInController,
  LoginController,
  // External
  CreateUserExternalController,
  CreateUserWithPasswordExternalController,
  ChangePasswordExternalController,
  UpdateUserExternalController,
  DeleteUserExternalController,
  GenerateSetPasswordLinkController,
  // OIDC
  AuthorizeController,
  ConfigurationController,
  UserInfoController,
  JwksController,
  LogoutController,
  SessionController,
  TokenController,
  // User
  CreateUserController,
  DisableUserController,
  EnableUserController,
  GetRoleListController,
  GetUserListController,
  GetUserSelfController,
  GetUserController,
  ResetPasswordController,
  SetPasswordController,
  UpdateUserSelfController,
  UpdateUserController,
  // Dashboard
  DashboardController,
  // Identity Provider
  GetEnabledProvidersController,
  GetIdentityProviderListController,
  GetIdentityProviderController,
  CreateIdentityProviderController,
  UpdateIdentityProviderController,
  DeleteIdentityProviderController,
  ToggleIdentityProviderController,
];

const SERVICES = [OAuthService, BhutanNdiService, LogoutService, IdentityProviderService];

@Module({
  imports: [HttpModule],
  controllers: CONTROLLERS,
  providers: SERVICES,
  exports: SERVICES,
})
export class ApiModule implements NestModule {
  private readonly logger = new Logger(ApiModule.name);

  configure(consumer: MiddlewareConsumer) {
    this.logger.log('Applying API middleware...');
  }
}
