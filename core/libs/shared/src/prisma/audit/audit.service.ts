import { PrismaLibConfig, PrismaTransactionClient } from '../types';
import { getCurrentDateInUTC } from '../utils';

/**
 * Create an audit log entry
 */
export async function setAuditLog(
    action: string,
    operation: string,
    model: string,
    recordId: any,
    oldValue: any,
    newValue: any,
    userId: string,
    prismaTx: PrismaTransactionClient | null,
    config: PrismaLibConfig
): Promise<void> {
    if (!config.enableAuditLog) {
        return;
    }

    try {
        if (prismaTx) {
            await prismaTx['auditLog'].create({
                data: {
                    action,
                    operation,
                    tableName: model,
                    recordId: recordId?.toString() || null,
                    oldValue: oldValue ? JSON.stringify(oldValue) : undefined,
                    newValue: newValue ? JSON.stringify(newValue) : undefined,
                    createdBy: userId || 'Anonymous',
                    createdAt: getCurrentDateInUTC(),
                },
            });
        }
    } catch (error) {
        // Log but don't throw - audit failures shouldn't break the main operation
        console.error('Failed to create audit log:', error);
    }
}

/**
 * Set audit fields (createdBy, updatedBy, etc.) on the data object
 */
export function setAuditFields(
    operation: string,
    args: any,
    config: PrismaLibConfig,
    model?: string
): void {
    // Skip if config is missing or audit log is disabled
    if (!config || config.enableAuditLog === false) {
        return;
    }

    // Skip models that don't have audit fields
    if (model && config.auditUnawareModels?.includes(model)) {
        return;
    }

    const userId = config.getCurrentUserId?.() || 'Anonymous';

    const data = Array.isArray(args.data) ? args.data : [args.data];

    if (operation === 'create' || operation === 'createMany') {
        data.forEach((item: any) => {
            if (item) {
                item.createdBy = userId;
            }
        });
    }

    if (operation === 'update' || operation === 'updateMany') {
        data.forEach((item: any) => {
            if (item) {
                item.updatedBy = userId;
            }
        });
    }
}
