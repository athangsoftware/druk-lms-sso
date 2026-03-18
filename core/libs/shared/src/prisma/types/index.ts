/**
 * Type representing a Prisma transaction client or raw PrismaClient
 */
export type PrismaTransactionClient = Record<string, any>;

/**
 * Database strategy types
 */
export enum DatabaseStrategy {
    /** Dedicated database per application - Full schema control via migrations */
    SINGLE_TENANT = 'single-tenant',

    /** Shared database with tenant isolation - Auto-filtered by tenantId */
    MULTI_TENANT = 'multi-tenant',

    /** Database shared with other apps (PHP, etc.) - Schema managed via SQL */
    SHARED_DB = 'shared-db',
}

/**
 * Prisma Library Configuration
 */
export interface PrismaLibConfig {
    /** The PrismaClient class from the generated client */
    PrismaClientClass?: any;

    /** Database strategy @default SINGLE_TENANT */
    strategy?: DatabaseStrategy;

    /** Database connection URL (falls back to DATABASE_URL env) */
    databaseUrl?: string;

    /** Field name for tenant filtering @default 'tenantId' */
    tenantFieldName?: string;

    /** Models excluded from tenant filtering @default [] */
    tenantUnawareModels?: string[];

    /** Enable audit logging @default true */
    enableAuditLog?: boolean;

    /** Models excluded from audit field injection (createdBy/updatedBy) @default [] */
    auditUnawareModels?: string[];

    /** Enable SQL query logging @default false */
    enableQueryLogging?: boolean;

    /** Transaction timeout in ms @default 120000 */
    transactionTimeout?: number;

    /** Connection pool size @default 10 */
    connectionLimit?: number;

    /** Get tenant ID from request context */
    getTenantId?: () => string | undefined;

    /** Get current user ID from request context */
    getCurrentUserId?: () => string | undefined;

    /** Resolve database URL for tenant (multi-tenant separate DB) */
    resolveTenantDatabaseUrl?: (tenantId: string) => string | Promise<string>;
}

/**
 * Operation context passed to handlers
 */
export interface OperationContext {
    query: any;
    prismaClient: any;
    args: any;
    model: string;
    userId: string;
    tenantId?: string;
    isTenantFilter?: boolean;
    config: PrismaLibConfig;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: Required<Pick<PrismaLibConfig,
    'strategy' |
    'tenantFieldName' |
    'tenantUnawareModels' |
    'enableAuditLog' |
    'enableQueryLogging' |
    'transactionTimeout' |
    'connectionLimit'
>> = {
    strategy: DatabaseStrategy.SINGLE_TENANT,
    tenantFieldName: 'tenantId',
    tenantUnawareModels: [],
    enableAuditLog: true,
    enableQueryLogging: false,
    transactionTimeout: 120000,
    connectionLimit: 10,
};
