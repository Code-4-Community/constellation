import { qldbDriver, tableName } from './qldb.js';

export async function insertDocument(
    document: Record<string, any>
): Promise<void> {
    await qldbDriver.executeLambda(async (txn) => {
        console.log('Insert document');
        await txn.execute(`INSERT INTO ${tableName} ?`, document);
    });
}

export async function fetchDocuments() {
    return await qldbDriver.executeLambda(async (txn) => {
        console.log('Fetching document');
        const result = await txn.execute(
            `SELECT * FROM ${tableName}`
        );
        return result.getResultList();
    });
}
