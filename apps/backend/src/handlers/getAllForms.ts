import { APIGatewayEvent } from 'aws-lambda';
import { fetchDocuments } from '../db/utils.js';
import { executeHandler } from '../utils/executeHandler.js';
import { validateMethodType } from '../utils/validateMethodType.js';

/**
 * An HTTP get method to get all forms from the QLDB table.
 */
export const getAllFormsHandler = async (event: APIGatewayEvent) => {
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
  let response = validateMethodType(
    event.httpMethod,
    'GET',
    'getAllFormsHandler'
  );
  if (response) {
    return response;
  }

  const handlerFunction = async () => {
    const allForms = await fetchDocuments();
    return JSON.stringify(allForms);
  };

    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(allForms),
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
  return executeHandler(event, handlerFunction);
};
