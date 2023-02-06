import { qldbDriver, createTable, createIndex } from './qldb.mjs';

export async function main() {
  await qldbDriver.executeLambda(async (txn) => {
    console.log('Create table TestTable');
    await createTable(txn);
    console.log('Create index on testField');
    await createIndex(txn);
  });
}
