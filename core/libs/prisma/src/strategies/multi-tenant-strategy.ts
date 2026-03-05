import { PrismaClient } from '../../generated/client/client';
import { PrismaLibConfig, DatabaseStrategy, DEFAULT_CONFIG } from '../types';
import { BasePrismaStrategy } from './base-strategy';
import { TerminalStyles } from '../utils';

/**
 * Multi-Tenant Strategy - Shared database with tenant isolation
 */
export class MultiTenantStrategy extends BasePrismaStrategy {
    constructor(config: PrismaLibConfig = {}) {
        super({ ...config, strategy: DatabaseStrategy.MULTI_TENANT });
    }

    create(): PrismaClient {
        const databaseUrl = this.getDatabaseUrl();
        
        console.log(TerminalStyles.cyan(`🏢 Creating Multi-Tenant Prisma Client`));
        console.log(TerminalStyles.gray(`   Tenant Field: ${this.config.tenantFieldName || DEFAULT_CONFIG.tenantFieldName}`));

        const baseClient = this.createBaseClient(databaseUrl);
        return this.applyTenantIsolation(baseClient);
    }

    getName(): string {
        return 'MultiTenantStrategy';
    }

    private applyTenantIsolation(client: PrismaClient): PrismaClient {
        const config = this.config;
        const tenantFieldName = config.tenantFieldName || DEFAULT_CONFIG.tenantFieldName;
        const tenantUnawareModels = config.tenantUnawareModels || DEFAULT_CONFIG.tenantUnawareModels;

        return client.$extends({
            name: 'multiTenantIsolation',
            query: {
                $allModels: {
                    async $allOperations({ model, operation, args, query }) {
                        if (tenantUnawareModels.includes(model)) {
                            return query(args);
                        }

                        const tenantId = config.getTenantId?.();

                        if (!tenantId) {
                            console.log(TerminalStyles.yellow(`⚠️  No tenant context for ${model}.${operation}`));
                            return query(args);
                        }

                        const mutableArgs = args as any;

                        const readOperations = ['findUnique', 'findFirst', 'findMany', 'count', 'aggregate', 'groupBy'];
                        const writeOperations = ['create', 'createMany', 'update', 'updateMany', 'upsert'];
                        const deleteOperations = ['delete', 'deleteMany'];

                        if (readOperations.includes(operation)) {
                            mutableArgs.where = { ...mutableArgs.where, [tenantFieldName]: tenantId };
                        } else if (writeOperations.includes(operation)) {
                            if (operation === 'create' && mutableArgs.data) {
                                mutableArgs.data = { ...mutableArgs.data, [tenantFieldName]: tenantId };
                            } else if (operation === 'createMany' && mutableArgs.data) {
                                mutableArgs.data = (Array.isArray(mutableArgs.data) ? mutableArgs.data : [mutableArgs.data]).map(
                                    (item: any) => ({ ...item, [tenantFieldName]: tenantId })
                                );
                            } else if ((operation === 'update' || operation === 'updateMany') && mutableArgs.where) {
                                mutableArgs.where = { ...mutableArgs.where, [tenantFieldName]: tenantId };
                            } else if (operation === 'upsert') {
                                mutableArgs.where = { ...mutableArgs.where, [tenantFieldName]: tenantId };
                                if (mutableArgs.create) {
                                    mutableArgs.create = { ...mutableArgs.create, [tenantFieldName]: tenantId };
                                }
                            }
                        } else if (deleteOperations.includes(operation)) {
                            mutableArgs.where = { ...mutableArgs.where, [tenantFieldName]: tenantId };
                        }

                        return query(mutableArgs);
                    },
                },
            },
        }) as unknown as PrismaClient;
    }
}
