import { PrismaLibConfig, PrismaTransactionClient } from '../../types';
import { setAuditLog } from '../../audit/audit.service';

export async function handleDelete(
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
    const oldValue = await prismaTx[model].findUnique({ where: args.where });

    if (!oldValue) {
        throw new Error(`Record not found for ${model}`);
    }

    await setAuditLog('delete', 'hardDelete', model, args.where.id, oldValue, null, userId, prismaTx, config);

    const deletedRecord = await query(args);
    return deletedRecord;
}
