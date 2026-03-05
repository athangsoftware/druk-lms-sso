import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

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
import { GenerateSetPasswordLinkController } from './external/generate-set-password-link/generate-set-password-link.controller';

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

// Services
import { OAuthService } from './auth.service';
import { BhutanNdiService } from './bhutan-ndi.service';
import { LogoutService } from './oidc/logout/logout.service';

const CONTROLLERS = [
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
];

const SERVICES = [OAuthService, BhutanNdiService, LogoutService];

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
