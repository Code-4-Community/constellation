import { createResponse, HTTPResponse } from './createResponse.js';
import { formSchema, adminNotesSchema, readSchema } from '../schema/schema.js';

export const validateRequestBody = (
  jsonBody: JSON[],
  schema: typeof adminNotesSchema | typeof formSchema | typeof readSchema
): HTTPResponse | undefined => {
  try {
    schema.parse(jsonBody);
  } catch (error) {
    const errorMessage = 'Body does not match schema. Error: ' + error;
    console.error(errorMessage);
    return createResponse(400, errorMessage);
  }
};
