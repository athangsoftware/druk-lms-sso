import { PrismaLibConfig, PrismaTransactionClient } from '../../types';
import { setAuditLog } from '../../audit/audit.service';

export async function handleDeleteMany(
    query: any,
    prismaTx: PrismaTransactionClient,
    args: any,
    model: string,
    userId: string,
    tenantId: string | undefined,
    isTenantFilter: boolean,
    config: PrismaLibConfig,
    tenantUnawareModels: Set<string>
): Promise<any> {
    const tenantFieldName = config.tenantFieldName || 'tenantId';

    if (!tenantUnawareModels.has(model) && tenantId && isTenantFilter) {
        if (Array.isArray(args.where)) {
            args.where = args.where.map((whereItem: any) => ({
                ...whereItem,
                [tenantFieldName]: tenantId,
            }));
        } else {
            args.where = { ...args.where, [tenantFieldName]: tenantId };
        }
    }

    const recordsToDelete = await prismaTx[model].findMany({ where: args.where });

    await Promise.all(
        recordsToDelete.map(async (record: any) => {
            await setAuditLog('deleteMany', 'delete', model, record.id, record, null, userId, prismaTx, config);
        })
    );

    const deletedRecords = await query(args);
    return deletedRecords;
}
