import { APIGatewayEvent } from 'aws-lambda';
import { createResponse } from '../utils/createResponse.js';
import { validateMethodType } from '../utils/validateMethodType.js';

// Create clients and set shared const values outside of the handler.
/**
 * A simple example includes a HTTP get method that returns "Hello world!".
 */
export const getHandler = async (event: APIGatewayEvent) => {
  let response = validateMethodType(event.httpMethod, 'GET', 'getHandler');

  if (response) {
    return response;
  }

  // All log statements are written to CloudWatch
  console.info('received:', event);

  response = createResponse(200, JSON.stringify('Hello world!'));

  // All log statements are written to CloudWatch
  console.log(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );

  return response;
};
