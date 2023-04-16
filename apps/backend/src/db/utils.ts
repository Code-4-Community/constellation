import { AdminNotes } from '../schema/schema.js';
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
    const result = await txn.execute(`SELECT * from ${tableName}`);
    return result.getResultList();
  });
}

export async function fetchDocumentById(id: string) {
  return await qldbDriver.executeLambda(async (txn) => {
    const result = await txn.execute(
      `SELECT * FROM ${tableName} where id = ?`,
      id
    );
    return result.getResultList();
  });
}

export async function updateDocumentAdminNotes(id: string, notes: AdminNotes) {
  return await qldbDriver.executeLambda(async (txn) => {
    return await txn.execute(
      `UPDATE ${tableName} as f SET f.adminNotes = ? where f.id = ?`,
      notes,
      id
    );
  });
}
