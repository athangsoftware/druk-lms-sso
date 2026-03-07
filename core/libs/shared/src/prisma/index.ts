// Types
export * from './types';

// Client factory
export { createPrismaClient, createTenantPrismaClient } from './client/prisma-client.factory';

// Strategies
export {
    BasePrismaStrategy,
    SingleTenantStrategy,
    MultiTenantStrategy,
    SharedDbStrategy,
} from './strategies';

// Extensions
export { getExtendedPrismaClient } from './extensions/extend';

// Audit
export { setAuditLog, setAuditFields } from './audit/audit.service';

// Utils
export * from './utils';

// Module integration
export { createPrismaModule, PRISMA_CONFIG, TENANT_CONTEXT } from './module/prisma.module';
export type { PrismaModuleAsyncOptions, TenantContext } from './module/prisma.module';
export { PrismaService } from './module/prisma.service';
