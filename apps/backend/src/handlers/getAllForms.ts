import { APIGatewayEvent } from 'aws-lambda';
import { fetchDocuments } from '../db/utils.js';
import { executeHandler } from '../utils/executeHandler.js';
import { sanitizeFormList } from '../utils/sanitizeForms.js';
import { validateMethodType } from '../utils/validateMethodType.js';

/**
 * An HTTP get method to get all forms from the QLDB table.
 */
export const getAllFormsHandler = async (event: APIGatewayEvent) => {
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

    const sanitizedForms = sanitizeFormList(allForms);

    return JSON.stringify(sanitizedForms);
  };

  return executeHandler(event, handlerFunction);
};
