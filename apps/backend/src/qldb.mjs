import { Agent } from 'https';
import { QldbDriver, RetryConfig } from 'amazon-qldb-driver-nodejs';

const maxConcurrentTransactions = 10;
const retryLimit = 4;

//Reuse connections with keepAlive
const lowLevelClientHttpOptions = {
  httpAgent: new Agent({
    maxSockets: maxConcurrentTransactions,
  }),
};

const serviceConfigurationOptions = {
  region: 'us-east-1',
};

//Use driver's default backoff function for this example (no second parameter provided to RetryConfig)
const retryConfig = new RetryConfig(retryLimit);
const ledgerName = 'myQLDBLedger';

export const qldbDriver = new QldbDriver(
  ledgerName,
  serviceConfigurationOptions,
  lowLevelClientHttpOptions,
  maxConcurrentTransactions,
  retryConfig
);
qldbDriver.getTableNames().then(function (tableNames) {
  console.log(tableNames);
});

export async function createTable(txn) {
  await txn.execute('CREATE TABLE TestTable');
}

export async function createIndex(txn) {
  await txn.execute('CREATE INDEX ON TestTable (testField)');
}

export async function insertDocument(txn) {
  const testRow = {
    testField: 'John',
    anotherField: 42,
  };
  await txn.execute('INSERT INTO TestTable ?', testRow);
}

export async function fetchDocuments(txn) {
  return await txn.execute('SELECT testField, anotherField FROM TestTable');
}
