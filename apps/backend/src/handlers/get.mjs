import { main } from '../dbsetup.mjs';

// Create clients and set shared const values outside of the handler.
/**
 * A simple example includes a HTTP get method that returns "Hello world!".
 */
export const getHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(
      `getHandler only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello world!'),
  };

  await main();

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
