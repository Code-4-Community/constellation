import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { fetchDocumentById } from '../db/utils.js';
import { createResponse } from '../utils/createResponse.js';

/**
 * An HTTP get method to get all forms from the QLDB table.
 */
export const getFormByIdHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') {
    return createResponse(
      400,
      `getMethod only accepts GET method, you tried: ${event.httpMethod} method.`
    );
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  try {
    await createTableIfNotExists();
    const id = event.pathParameters!.id!;
    const form = await fetchDocumentById(id);

    const response = createResponse(200, JSON.stringify(form));

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