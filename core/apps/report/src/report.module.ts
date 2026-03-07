import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RequestContextModule } from '@app/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig, { AppConfig } from './config';
import { PrismaModule } from '@app/prisma';
import { BcryptModule, AuthModule, ApiKeyModule } from '@app/shared';
import { ApiModule } from './feature/api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/report/.env',
      load: [appConfig],
      isGlobal: true,
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
    BcryptModule,
    PrismaModule.forRoot(),
    RequestContextModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class ReportModule {}
