import { QLDBSessionClientConfig } from '@aws-sdk/client-qldb-session';
import { NodeHttpHandlerOptions } from '@aws-sdk/node-http-handler';
import { QldbDriver, RetryConfig } from 'amazon-qldb-driver-nodejs';
import { Agent } from 'https';

// IMPORTANT: this must match the ledger name defined in template.yaml
const ledgerName =
  process.env.ENV_NAME === 'prod' ? 'constellation-prod' : 'constellation-dev';

const maxConcurrentTransactions = 10;
const retryLimit = 4;

//Reuse connections with keepAlive
const lowLevelClientHttpOptions: NodeHttpHandlerOptions = {
  httpAgent: new Agent({
    maxSockets: maxConcurrentTransactions,
  }),
};

const serviceConfigurationOptions: QLDBSessionClientConfig = {
  region: 'us-east-1',
};

//Use driver's default backoff function for this example (no second parameter provided to RetryConfig)
const retryConfig: RetryConfig = new RetryConfig(retryLimit);

// There should be 1 global driver for the application.
// See https://docs.aws.amazon.com/qldb/latest/developerguide/driver.best-practices.html#driver.best-practices.configuring
export const qldbDriver: QldbDriver = new QldbDriver(
  ledgerName,
  serviceConfigurationOptions,
  lowLevelClientHttpOptions,
  maxConcurrentTransactions,
  retryConfig,
);

export const tableName = 'Forms';
