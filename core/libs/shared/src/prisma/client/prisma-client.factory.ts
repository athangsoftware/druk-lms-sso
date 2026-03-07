import { PrismaLibConfig, DEFAULT_CONFIG, DatabaseStrategy } from '../types';
import { SingleTenantStrategy } from '../strategies/single-tenant-strategy';
import { MultiTenantStrategy } from '../strategies/multi-tenant-strategy';
import { SharedDbStrategy } from '../strategies/shared-db-strategy';
import { TerminalStyles } from '../utils';

/**
 * Creates a configured PrismaClient instance based on the database strategy
 */
export function createPrismaClient(config: PrismaLibConfig = {}): any {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    const strategy = mergedConfig.strategy || DatabaseStrategy.SINGLE_TENANT;

    console.log(TerminalStyles.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    console.log(TerminalStyles.cyan(`🔌 Prisma Client Factory`));
    console.log(TerminalStyles.gray(`   Strategy: ${strategy}`));
    console.log(TerminalStyles.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));

    switch (strategy) {
        case DatabaseStrategy.SINGLE_TENANT:
            return new SingleTenantStrategy(mergedConfig).create();

        case DatabaseStrategy.MULTI_TENANT:
            return new MultiTenantStrategy(mergedConfig).create();

        case DatabaseStrategy.SHARED_DB:
            return new SharedDbStrategy(mergedConfig).create();

        default:
            throw new Error(
                `Unknown database strategy: ${strategy}. ` +
                `Valid strategies are: ${Object.values(DatabaseStrategy).join(', ')}`
            );
    }
}

/**
 * Creates a PrismaClient for a specific tenant (multi-tenant separate DB strategy)
 */
export async function createTenantPrismaClient(
    tenantId: string,
    config: PrismaLibConfig
): Promise<any> {
    if (!config.resolveTenantDatabaseUrl) {
        throw new Error(
            'resolveTenantDatabaseUrl is required for createTenantPrismaClient.'
        );
    }

    const databaseUrl = await config.resolveTenantDatabaseUrl(tenantId);
    
    console.log(TerminalStyles.cyan(`🔑 Creating tenant-specific client for: ${tenantId}`));

    return createPrismaClient({
        ...config,
        strategy: DatabaseStrategy.SINGLE_TENANT,
        databaseUrl,
    });
}

export default createPrismaClient;
