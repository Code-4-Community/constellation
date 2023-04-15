import { APIGatewayEvent } from 'aws-lambda';

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

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers':
        'Content-Type, Access-Control-Allow-Origin',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    body: JSON.stringify('Hello world!'),
  };
  // All log statements are written to CloudWatch
  console.log(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
