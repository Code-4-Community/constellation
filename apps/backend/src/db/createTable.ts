import { TransactionExecutor } from 'amazon-qldb-driver-nodejs';
import { qldbDriver, tableName } from './qldb.js';

// Not sure if we actually want to use this function; we could also manually create
// the table in the AWS console so the rest of the application code can assume the
// table exists.
export async function createTableIfNotExists() {
  const tableNames = await qldbDriver.getTableNames();
  if (!tableNames.includes(tableName)) {
    await qldbDriver.executeLambda(async (txn) => {
      await createTable(txn);
      // await createIndex(txn);
    });
  }
}

async function createTable(txn: TransactionExecutor): Promise<void> {
  console.log(`Creating table ${tableName}.`);
  await txn.execute(`CREATE TABLE ${tableName}`);
}

// this is just an example of creating an indexed field
// TODO: adjust logic depending on which fields will be searched on
async function createIndex(txn: TransactionExecutor): Promise<void> {
  console.log('Creating index on testField');
  await txn.execute(`CREATE INDEX ON ${tableName} (testField)`);
}
