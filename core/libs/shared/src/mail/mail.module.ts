import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { EmailService } from './mail.service';
import { MAIL_CONFIG, MailConfig } from './mail-config';

interface MailModuleOptions {
  config: MailConfig;
}

interface MailModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<MailConfig> | MailConfig;
  inject?: any[];
  imports?: any[];
}

@Global()
@Module({})
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        EmailService,
        { provide: MAIL_CONFIG, useValue: options.config },
      ],
      exports: [EmailService],
    };
  }

  static forRootAsync(options: MailModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: MailModule,
      imports: options.imports || [],
      providers: [...asyncProviders, EmailService],
      exports: [EmailService],
    };
  }

  private static createAsyncProviders(options: MailModuleAsyncOptions): Provider[] {
    return [
      {
        provide: MAIL_CONFIG,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
  }
}
