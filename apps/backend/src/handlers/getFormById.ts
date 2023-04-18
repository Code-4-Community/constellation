import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { fetchDocumentById } from '../db/utils.js';

/**
 * An HTTP get method to get all forms from the QLDB table.
 */
export const getFormByIdHandler = async (event: APIGatewayEvent) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin, Authorization',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
  };

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 400,
      headers,
      body: `getMethod only accepts GET method, you tried: ${event.httpMethod} method.`,
    };
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  try {
    await createTableIfNotExists();
    const id = event.pathParameters!.id!;
    const form = await fetchDocumentById(id);

    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(form),
    };

    // All log statements are written to CloudWatch
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode}`
    );

    return response;
  } catch (error) {
    console.error('error accessing database', error);
    return {
      statusCode: 400,
      headers,
      body: 'error',
    };
  }
};