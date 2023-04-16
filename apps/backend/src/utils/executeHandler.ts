import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { createResponse } from './createResponse.js';

/** Method to execute the logic of the handler.
 * @param event - API Gateway event
 * @param handlerFunction - function to be executed to hanlde the logic of the endpoint, returns the body of the response
 * @returns A response for the handler with a status code, headers, and body
 */
export const executeHandler = async (
  event: APIGatewayEvent,
  handlerFunction: () => Promise<string | undefined>
) => {
  // All log statements are written to CloudWatch
  console.info('received:', event);

  try {
    await createTableIfNotExists();
    const body = await handlerFunction();

    const response = createResponse(200, body);

    // All log statements are written to CloudWatch
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode}`
    );

    return response;
  } catch (error) {
    console.error('error accessing database', error);

    return createResponse(400, 'error');
  }
};
