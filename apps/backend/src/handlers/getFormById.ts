import { APIGatewayEvent } from 'aws-lambda';
import { fetchDocumentById } from '../db/utils.js';
import { executeHandler } from '../utils/executeHandler.js';
import { sanitizeFormList } from '../utils/sanitizeForms.js';
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
    const validatedForm = sanitizeFormList(form);
    if (validatedForm.length !== 0) {
      return JSON.stringify(validatedForm);
    } else {
      throw new Error(`This form does not match the expected type.`);
    }
  };

  return executeHandler(event, handlerFunction);
};
