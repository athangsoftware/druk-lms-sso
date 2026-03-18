import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RequestContextModule } from '@app/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig, { AppConfig } from './config';
import { PrismaModule } from '@app/prisma-sso';
import { BcryptModule, AuthModule, ApiKeyModule, MailModule } from '@app/shared';
import { ApiModule } from './feature/api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
      envFilePath: 'apps/sso/.env',
    }),
    ApiModule,
    AuthModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        jwtPrivateKey: configService.get<AppConfig>('app')?.jwtPrivateKey ?? '',
        jwtPublicKey: configService.get<AppConfig>('app')?.jwtPublicKey ?? '',
        jwtExpire: configService.get<AppConfig>('app')?.jwtExpire ?? '',
        userAccessControlKey: 'role',
      }),
      inject: [ConfigService],
    }),
    ApiKeyModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<AppConfig>('app')?.apiSecretKey ?? '',
        apiKeyHeader:
          configService.get<AppConfig>('app')?.apiKeyHeader || 'x-api-key',
      }),
      inject: [ConfigService],
    }),
    MailModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        tenancyId: configService.get<AppConfig>('app')?.oci.tenancyId ?? '',
        userId: configService.get<AppConfig>('app')?.oci.userId ?? '',
        fingerprint: configService.get<AppConfig>('app')?.oci.fingerprint ?? '',
        privateKey: configService.get<AppConfig>('app')?.oci.privateKey ?? '',
        region: configService.get<AppConfig>('app')?.oci.region ?? '',
        compartmentId: configService.get<AppConfig>('app')?.oci.compartmentId ?? '',
        approvedSender: configService.get<AppConfig>('app')?.oci.approvedSender ?? '',
      }),
      inject: [ConfigService],
    }),
    BcryptModule,
    PrismaModule.forRoot({
      auditUnawareModels: ['RolePermission', 'UserRole'],
    }),
    RequestContextModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class SsoModule {}
