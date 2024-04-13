import { APIGatewayEvent } from 'aws-lambda';
import { fetchDocumentById } from '../db/utils.js';
import { executeHandler } from '../utils/executeHandler.js';
import { validateMethodType } from '../utils/validateMethodType.js';

/**
 * An HTTP get method to get all forms from the QLDB table.
 */
export const getFormByIdHandler = async (event: APIGatewayEvent) => {
  let response = validateMethodType(
    event.httpMethod,
    'GET',
    'getFormByIdHandler'
  );
  if (response) {
    return response;
  }

  const handlerFunction = async () => {
    const id = event.pathParameters!.id!;
    const form = await fetchDocumentById(id);
    return JSON.stringify(form);
  };

  return executeHandler(event, handlerFunction);
};
