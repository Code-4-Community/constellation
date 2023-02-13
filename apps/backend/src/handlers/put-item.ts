import { APIGatewayEvent } from 'aws-lambda';
import { insertDocument } from '../db/utils.js';

// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a HTTP post method to add one item to a dummy nonexistent table.
 */
export const putItemHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Get id and name from the body of the request
  const body = JSON.parse(event.body!);
  const id = body.id;
  const name = body.name;

  await insertDocument({ testField: name, anotherField: id });

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
