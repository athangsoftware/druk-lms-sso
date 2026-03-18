import { PrismaLibConfig, PrismaTransactionClient } from '../../types';
import { setAuditFields, setAuditLog } from '../../audit/audit.service';

export async function handleCreateMany(
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
        if (Array.isArray(args.data)) {
            args.data = args.data.map((dataItem: any) => ({
                ...dataItem,
                [tenantFieldName]: tenantId,
            }));
        } else {
            args.data = { ...args.data, [tenantFieldName]: tenantId };
        }
    }

    setAuditFields('create', args, config, model);

    const result = await query(args);

    if (config.enableAuditLog) {
        await setAuditLog(
            'createMany', 'create', model, null, null,
            { count: result.count, data: args.data },
            userId, prismaTx, config
        );
    }

    return result;
}
