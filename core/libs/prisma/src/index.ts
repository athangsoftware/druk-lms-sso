// Types
export * from './types';

// Re-export Prisma Client and types for convenience
export { PrismaClient, Prisma, Role } from '../generated/client/client';

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
export { PrismaModule, PRISMA_CONFIG, TENANT_CONTEXT } from './module/prisma.module';
export type { PrismaModuleAsyncOptions, TenantContext } from './module/prisma.module';
export { PrismaService } from './module/prisma.service';
