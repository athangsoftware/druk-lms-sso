import { PrismaLibConfig, PrismaTransactionClient } from '../../types';
import { deepEqual } from '../../utils';
import { setAuditFields, setAuditLog } from '../../audit/audit.service';

export async function handleUpdate(
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

    setAuditFields('update', args, config, model);

    const oldValue = await prismaTx[model].findFirst({ where: args.where });

    if (!oldValue) {
        throw new Error(`Record not found for ${model}`);
    }

    const newData = args.data;
    const changedFields = Object.keys(newData).reduce((acc: Record<string, any>, key: string) => {
        const oldVal = oldValue[key];
        const newVal = newData[key];

        if (oldVal instanceof Date && newVal instanceof Date) {
            if (oldVal.getTime() !== newVal.getTime()) {
                acc[key] = newVal;
            }
        } else if (!deepEqual(oldVal, newVal)) {
            acc[key] = newVal;
        }

        return acc;
    }, {});

    if (Object.keys(changedFields).length === 0) {
        return oldValue;
    }

    const newValue = await query(args);

    if (!deepEqual(oldValue, newValue)) {
        await setAuditLog('update', 'update', model, newValue.id, oldValue, newValue, userId, prismaTx, config);
    }

    return newValue;
}
