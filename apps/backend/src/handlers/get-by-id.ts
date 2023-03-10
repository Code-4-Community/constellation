import { APIGatewayEvent } from 'aws-lambda';
import { qldbDriver } from '../db/qldb.js';
import { fetchDocuments } from '../db/utils.js';
// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a HTTP get method to get one item by id from a dummy nonexistent table.
 */
export const getByIdHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(
      `getMethod only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Get id from pathParameters from APIGateway because of `/{id}` at template.yaml
  const id = event.pathParameters!.id;

  const response = {
    statusCode: 200,
    body: JSON.stringify(id),
  };

  const resultList = await fetchDocuments();

  // Pretty print the result list
  console.log('The result List is ', JSON.stringify(resultList, null, 2));
  // All log statements are written to CloudWatch
  console.log(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
