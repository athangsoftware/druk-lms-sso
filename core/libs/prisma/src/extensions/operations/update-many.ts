import { PrismaLibConfig, PrismaTransactionClient } from '../../types';
import { deepEqual } from '../../utils';
import { setAuditFields, setAuditLog } from '../../audit/audit.service';

export async function handleUpdateMany(
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

    args.where = { ...args.where };

    if (!Array.isArray(args.data)) {
        setAuditFields('updateMany', args, config);
        const updatedRecords = await query(args);
        await setAuditLog('updateMany', 'update', model, null, null, args.data, userId, prismaTx, config);
        return updatedRecords;
    }

    const existingRecords = await prismaTx[model].findMany({ where: args.where });
    const idToOldValueMap = new Map(existingRecords.map((oldValue: any) => [oldValue.id, oldValue]));
    const processedIds = new Set<string>();

    const updatedRecords = await updateRecords(prismaTx, model, args, idToOldValueMap, processedIds, userId, config);
    const createdRecords = await createRecords(prismaTx, model, args, idToOldValueMap, userId, config);
    const newValues = [...updatedRecords, ...createdRecords];
    const deletedRecords = await deleteRecords(idToOldValueMap, newValues, prismaTx, model, userId, config);

    return { newValues, deletedRecords };
}

async function updateRecords(
    prismaTx: PrismaTransactionClient, model: string, args: any,
    idToOldValueMap: Map<any, any>, processedIds: Set<any>,
    userId: string, config: PrismaLibConfig
): Promise<any[]> {
    const recordsToUpdate: any[] = [];
    const auditPromises: Promise<void>[] = [];

    for (const recordData of args.data) {
        const oldValue = recordData.id && idToOldValueMap.has(recordData.id) ? idToOldValueMap.get(recordData.id) : null;

        if (oldValue) {
            const changedFields = Object.keys(recordData).reduce((acc: Record<string, any>, key: string) => {
                if (!deepEqual(oldValue[key], recordData[key])) { acc[key] = recordData[key]; }
                return acc;
            }, {});

            if (Object.keys(changedFields).length > 0) {
                recordsToUpdate.push({ id: recordData.id, data: changedFields });
                processedIds.add(recordData.id);
                auditPromises.push(
                    setAuditLog('updateMany', 'update', model, recordData.id, oldValue, { id: recordData.id, ...changedFields }, userId, prismaTx, config)
                );
            } else {
                recordsToUpdate.push(oldValue);
            }
        } else {
            recordsToUpdate.push(recordData);
        }
    }

    const validRecords = recordsToUpdate.filter((record) => record.id !== undefined && record.data !== undefined);
    if (validRecords.length > 0) {
        const updatePromises = validRecords.map((record) => {
            if (record.data && Object.keys(record.data).length > 0) {
                return prismaTx[model].updateMany({ where: { id: record.id }, data: record.data });
            }
            return null;
        }).filter(Boolean);
        if (updatePromises.length > 0) { await Promise.all(updatePromises); }
    }

    await Promise.all(auditPromises);
    return recordsToUpdate;
}

async function createRecords(
    prismaTx: PrismaTransactionClient, model: string, args: any,
    idToOldValueMap: Map<any, any>, userId: string, config: PrismaLibConfig
): Promise<any[]> {
    const recordsToCreate: any[] = [];
    const auditPromises: Promise<void>[] = [];

    for (const recordData of args.data) {
        if (!recordData.id || !idToOldValueMap.has(recordData.id)) {
            recordsToCreate.push(recordData);
            auditPromises.push(setAuditLog('updateMany', 'create', model, null, null, recordData, userId, prismaTx, config));
        }
    }

    if (recordsToCreate.length > 0) {
        await prismaTx[model].createMany({ data: recordsToCreate });
    }

    await Promise.all(auditPromises);
    return recordsToCreate;
}

async function deleteRecords(
    idToOldValueMap: Map<any, any>, newValues: any[],
    prismaTx: PrismaTransactionClient, model: string,
    userId: string, config: PrismaLibConfig
): Promise<any[]> {
    const recordsToDelete: any[] = [];
    const auditPromises: Promise<void>[] = [];

    for (const [removedId, removedOldValue] of idToOldValueMap.entries()) {
        if (!newValues.some((newValue: any) => newValue.id === removedId)) {
            recordsToDelete.push({ id: removedId, oldValue: removedOldValue });
            auditPromises.push(setAuditLog('updateMany', 'hardDelete', model, removedId, removedOldValue, null, userId, prismaTx, config));
        }
    }

    if (recordsToDelete.length > 0) {
        await prismaTx[model].deleteMany({ where: { id: { in: recordsToDelete.map((record) => record.id) } } });
    }

    await Promise.all(auditPromises);
    return recordsToDelete;
}
