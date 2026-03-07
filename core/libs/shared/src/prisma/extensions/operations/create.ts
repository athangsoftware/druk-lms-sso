import { PrismaLibConfig, PrismaTransactionClient } from '../../types';
import { setAuditFields, setAuditLog } from '../../audit/audit.service';

export async function handleCreate(
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
        args.data = { ...args.data, [tenantFieldName]: tenantId };
    }

    setAuditFields('create', args, config);

    const newValue = await query(args);

    await setAuditLog('create', 'create', model, newValue.id, null, newValue, userId, prismaTx, config);

    return newValue;
}
