// Re-export generated Report client types
export { PrismaClient, Prisma, DbType, ChartType, FilterType, MissingColumnBehavior } from '../generated/client/client';
export type {
    DbConnection,
    AiProvider,
    Chart,
    Dashboard,
    DashboardChart,
    DashboardFilter,
    GlobalFilter,
    GlobalFilterOverride,
    AuditLog,
    MetaData,
} from '../generated/client/client';

// Re-export shared Prisma infrastructure
export { PrismaService } from '@app/shared/prisma';
export { PRISMA_CONFIG, TENANT_CONTEXT } from '@app/shared/prisma';
export { getExtendedPrismaClient } from '@app/shared/prisma';
export { setAuditLog, setAuditFields } from '@app/shared/prisma';
export { createPrismaClient, createTenantPrismaClient } from '@app/shared/prisma';
export type { PrismaLibConfig, PrismaModuleAsyncOptions, TenantContext, PrismaTransactionClient } from '@app/shared/prisma';
export { DatabaseStrategy } from '@app/shared/prisma';

// PrismaModule pre-configured with Report PrismaClient
import { PrismaClient } from '../generated/client/client';
import { createPrismaModule } from '@app/shared/prisma';

export const PrismaModule = createPrismaModule(PrismaClient);
