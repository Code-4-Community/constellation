import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';

// Create clients and set shared const values outside of the handler.
/**
 * A simple example includes a HTTP get method that returns "Hello world!".
 */
export const getHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(
      `getHandler only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
  await createTableIfNotExists();

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello world!'),
  };
  // All log statements are written to CloudWatch
  console.log(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
