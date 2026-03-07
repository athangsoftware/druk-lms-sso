import { PrismaLibConfig, DEFAULT_CONFIG, PrismaTransactionClient } from '../types';
import {
    handleCreate,
    handleCreateMany,
    handleUpdate,
    handleUpdateMany,
    handleDelete,
    handleDeleteMany,
} from './operations';

async function applyTenantFilters(
    args: any,
    model: string,
    tenantId: string | undefined,
    isTenantFilter: boolean,
    config: PrismaLibConfig,
    tenantUnawareModels: Set<string>
): Promise<void> {
    const tenantFieldName = config.tenantFieldName || 'tenantId';

    if (!tenantUnawareModels.has(model) && isTenantFilter && tenantId) {
        args.where = { ...args.where, [tenantFieldName]: tenantId };
    }
}

async function handleDatabaseOperation(
    operation: string, args: any, query: any, model: string,
    prismaTx: PrismaTransactionClient | null, isTenantFilter: boolean,
    config: PrismaLibConfig, tenantUnawareModels: Set<string>
): Promise<any> {
    if (!prismaTx) {
        return query(args);
    }

    const startTime = performance.now();
    const userId = config.getCurrentUserId?.() || 'Anonymous';
    const tenantId = config.getTenantId?.();

    const operationHandlers: Record<string, () => Promise<any>> = {
        create: () => handleCreate(query, prismaTx, args, model, userId, tenantId, isTenantFilter, config, tenantUnawareModels),
        createMany: () => handleCreateMany(query, prismaTx, args, model, userId, tenantId, isTenantFilter, config, tenantUnawareModels),
        update: () => handleUpdate(query, prismaTx, args, model, userId, tenantId, isTenantFilter, config, tenantUnawareModels),
        updateMany: () => handleUpdateMany(query, prismaTx, args, model, userId, tenantId, isTenantFilter, config, tenantUnawareModels),
        delete: () => handleDelete(query, prismaTx, args, model, userId, tenantId, isTenantFilter, config, tenantUnawareModels),
        deleteMany: () => handleDeleteMany(query, prismaTx, args, model, userId, tenantId, isTenantFilter, config, tenantUnawareModels),
        findMany: async () => { await applyTenantFilters(args, model, tenantId, isTenantFilter, config, tenantUnawareModels); return query(args); },
        findUnique: async () => { await applyTenantFilters(args, model, tenantId, isTenantFilter, config, tenantUnawareModels); return query(args); },
        findFirst: async () => { await applyTenantFilters(args, model, tenantId, isTenantFilter, config, tenantUnawareModels); return query(args); },
        count: async () => { await applyTenantFilters(args, model, tenantId, isTenantFilter, config, tenantUnawareModels); return query(args); },
    };

    const handler = operationHandlers[operation];
    if (!handler) { return query(args); }

    const result = await handler();

    if (config.enableQueryLogging) {
        const executionTime = performance.now() - startTime;
        console.log({ level: 'info', message: 'Prisma Query', model, operation, executionTime: `${executionTime.toFixed(2)}ms` });
    }

    return result;
}

export function getExtendedPrismaClient(
    prismaClient: any,
    prismaTx: PrismaTransactionClient | null,
    isTenantFilter: boolean = true,
    config: PrismaLibConfig = {}
) {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    const tenantUnawareModels = new Set(mergedConfig.tenantUnawareModels || []);

    return prismaClient.$extends({
        query: {
            $allModels: {
                create: ({ args, query, model }) => handleDatabaseOperation('create', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
                createMany: ({ args, query, model }) => handleDatabaseOperation('createMany', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
                update: ({ args, query, model }) => handleDatabaseOperation('update', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
                updateMany: ({ args, query, model }) => handleDatabaseOperation('updateMany', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
                delete: ({ args, query, model }) => handleDatabaseOperation('delete', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
                deleteMany: ({ args, query, model }) => handleDatabaseOperation('deleteMany', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
                findMany: ({ args, query, model }) => handleDatabaseOperation('findMany', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
                findUnique: ({ args, query, model }) => handleDatabaseOperation('findUnique', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
                findFirst: ({ args, query, model }) => handleDatabaseOperation('findFirst', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
                count: ({ args, query, model }) => handleDatabaseOperation('count', args, query, model, prismaTx, isTenantFilter, mergedConfig, tenantUnawareModels),
            },
        },
    });
}
