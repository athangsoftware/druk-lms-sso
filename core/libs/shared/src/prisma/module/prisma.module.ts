import { Global, Module, DynamicModule, Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import { PrismaLibConfig } from '../types';
import { PRISMA_CONFIG, TENANT_CONTEXT } from './constants';

export { PRISMA_CONFIG, TENANT_CONTEXT };

export interface TenantContext {
    tenantId?: string;
    userId?: string;
    userRole?: string;
    clientIp?: string;
}

export interface PrismaModuleAsyncOptions {
    useFactory: (...args: any[]) => Promise<PrismaLibConfig> | PrismaLibConfig;
    inject?: any[];
    imports?: any[];
    useRequestScope?: boolean;
}

/**
 * Creates a PrismaModule class pre-configured with a specific PrismaClient class.
 * Each database lib (prisma-sso, prisma-report) calls this with its own PrismaClient.
 */
export function createPrismaModule(PrismaClientClass: any) {
    @Global()
    @Module({})
    class PrismaModule {
        static forRoot(config: PrismaLibConfig = {}): DynamicModule {
            const mergedConfig: PrismaLibConfig = { ...config, PrismaClientClass };
            const configProvider: Provider = {
                provide: PRISMA_CONFIG,
                useValue: mergedConfig,
            };

            return {
                module: PrismaModule,
                providers: [configProvider, PrismaService],
                exports: [PrismaService],
            };
        }

        static forRootAsync(options: PrismaModuleAsyncOptions): DynamicModule {
            const configProvider: Provider = {
                provide: PRISMA_CONFIG,
                useFactory: async (...args: any[]) => {
                    const config = await options.useFactory(...args);
                    return { ...config, PrismaClientClass };
                },
                inject: options.inject || [],
            };

            const providers: Provider[] = [configProvider];

            if (options.useRequestScope) {
                providers.push({
                    provide: TENANT_CONTEXT,
                    useFactory: (request: any): TenantContext => {
                        return {
                            tenantId: request?.user?.tenantId || request?.headers?.['x-tenant-id'],
                            userId: request?.user?.id || request?.user?.sub,
                            userRole: request?.user?.role,
                            clientIp: request?.ip || request?.headers?.['x-forwarded-for'],
                        };
                    },
                    inject: [REQUEST],
                    scope: Scope.REQUEST,
                });

                providers.push({
                    provide: PrismaService,
                    useClass: PrismaService,
                    scope: Scope.REQUEST,
                });
            } else {
                providers.push(PrismaService);
            }

            return {
                module: PrismaModule,
                imports: options.imports || [],
                providers,
                exports: [PrismaService, ...(options.useRequestScope ? [TENANT_CONTEXT] : [])],
            };
        }

        static forFeature(token: string, config: PrismaLibConfig): DynamicModule {
            const mergedConfig: PrismaLibConfig = { ...config, PrismaClientClass };
            const configProvider: Provider = {
                provide: `${token}_CONFIG`,
                useValue: mergedConfig,
            };

            const serviceProvider: Provider = {
                provide: token,
                useFactory: (cfg: PrismaLibConfig) => {
                    return new PrismaService(cfg);
                },
                inject: [`${token}_CONFIG`],
            };

            return {
                module: PrismaModule,
                providers: [configProvider, serviceProvider],
                exports: [token],
            };
        }
    }

    return PrismaModule;
}
