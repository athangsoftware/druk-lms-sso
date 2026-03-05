import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyService } from './api-key.service';

export interface ApiKeyModuleOptions {
  secret: string;
  apiKeyHeader: string;
}

export interface ApiKeyModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<ApiKeyModuleOptions> | ApiKeyModuleOptions;
  inject?: any[];
}

@Global()
@Module({})
export class ApiKeyModule {
  static register(options: ApiKeyModuleOptions): DynamicModule {
    return {
      module: ApiKeyModule,
      providers: [
        { provide: 'API_SECRET_KEY', useValue: options.secret },
        { provide: 'AUTH_HEADER_KEY', useValue: options.apiKeyHeader },
        ApiKeyService,
      ],
      exports: ['API_SECRET_KEY', 'AUTH_HEADER_KEY', ApiKeyService],
    };
  }

  static registerAsync(options: ApiKeyModuleAsyncOptions): DynamicModule {
    const asyncProviders: Provider[] = [
      {
        provide: 'API_SECRET_KEY',
        useFactory: async (...args: any[]) => {
          const config = await options.useFactory(...args);
          return config.secret;
        },
        inject: options.inject || [],
      },
      {
        provide: 'AUTH_HEADER_KEY',
        useFactory: async (...args: any[]) => {
          const config = await options.useFactory(...args);
          return config.apiKeyHeader;
        },
        inject: options.inject || [],
      },
      ApiKeyService,
    ];

    return {
      module: ApiKeyModule,
      imports: [ConfigModule],
      providers: asyncProviders,
      exports: ['API_SECRET_KEY', 'AUTH_HEADER_KEY', ApiKeyService],
    };
  }
}
