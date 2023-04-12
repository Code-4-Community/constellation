import { qldbDriver, tableName } from './qldb.js';

export async function insertDocument(
  document: Record<string, any>
): Promise<void> {
  await qldbDriver.executeLambda(async (txn) => {
    await txn.execute(`INSERT INTO ${tableName} ?`, document);
  });
}

export async function fetchDocuments() {
  return await qldbDriver.executeLambda(async (txn) => {
    const result = await txn.execute(
      `SELECT metadata.id, data FROM _ql_committed_${tableName}`
    );
    return result.getResultList();
  });
}

export async function fetchDocumentById(id: string) {
  return await qldbDriver.executeLambda(async (txn) => {
    const result = await txn.execute(
      `SELECT metadata.id, data FROM _ql_committed_${tableName} where metadata.id = ?`,
      id
    );
    return result.getResultList();
  });
}
