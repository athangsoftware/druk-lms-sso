// Auth
export { AuthModule } from './auth/auth.module';
export type { AuthModuleOptions, AuthModuleAsyncOptions } from './auth/auth.module';
export { AuthService } from './auth/auth.service';
export { Authorize } from './auth/authorize.decorator';
export { AuthorizeGuard } from './auth/authorize.guard';
export type { AuthorizeGuardConfig } from './auth/authorize.guard';
export { CurrentUser } from './auth/current-user';
export { JwtAuthGuard } from './auth/jwt/jwt.guard';
export { JwtAuthStrategy } from './auth/jwt/jwt.strategy';
export { UserType } from './auth/roles';

// API Key
export { ApiKeyModule } from './api-key/api-key.module';
export type { ApiKeyModuleOptions, ApiKeyModuleAsyncOptions } from './api-key/api-key.module';
export { ApiKeyService } from './api-key/api-key.service';
export { ApiKeyGuard } from './api-key/api-key.guard';
export { ApiKeyAuthorization } from './api-key/api-key.decorator';

// Bcrypt
export { BcryptModule } from './bcrypt/bcrypt.module';
export { BcryptService } from './bcrypt/bcrypt.service';

// Mail
export { MailModule } from './mail/mail.module';
export { EmailService } from './mail/mail.service';
export { MAIL_CONFIG } from './mail/mail-config';
export type { MailConfig } from './mail/mail-config';

// Request Context
export { RequestContext } from './request-context/request-context.model';
export { RequestContextMiddleware } from './request-context/request-context.middleware';
export { RequestContextModule } from './request-context/request-context.module';

// Helpers
export { setupSwagger } from './helpers/swagger.helper';
export { getClientIp } from './helpers/request.helper';
export { SnakeToCamelInterceptor } from './helpers/snake-to-camel.interceptor';

// Utils
export { Utils } from './utils/core.util';
export { formatDateToMMYYYY, addDaysToDate } from './utils/date.util';

// Validators
export { AppValidationPipe } from './validators/app-validation.pipe';
export { SanitizeUndefinedPipe } from './validators/sanitize-undefined.pipe';

// Validator Decorators
export { ConditionalProperty } from './validators/decorators/conditional-property.decorator';
export { IsRequiredBasedOtherField } from './validators/decorators/is-required-based-other-field.decorator';
export { IsSingleElement } from './validators/decorators/is-single-element.decorator';
export { IsValidDate } from './validators/decorators/is-valid-date.decorator';
export { TransformMMYYYYToISO } from './validators/decorators/transform-mm-yyyy-to-iso.decorator';

// Prisma (shared infrastructure - client-agnostic)
export { createPrismaModule, PRISMA_CONFIG, TENANT_CONTEXT } from './prisma';
export type { PrismaModuleAsyncOptions, TenantContext } from './prisma';
export { PrismaService } from './prisma';
export type { PrismaLibConfig, PrismaTransactionClient } from './prisma';
export { DatabaseStrategy } from './prisma';
export { createPrismaClient, createTenantPrismaClient } from './prisma';
export { getExtendedPrismaClient } from './prisma';
export { setAuditLog, setAuditFields } from './prisma';
export { deepEqual, getCurrentDateInUTC, TerminalStyles } from './prisma';
