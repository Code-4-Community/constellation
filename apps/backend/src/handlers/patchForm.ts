import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { updateDocumentAdminNotes } from '../db/utils.js';
import { adminNotesSchema } from '../schema/schema.js';
import { createResponse } from '../utils/createResponse.js';
import { validateMethodType } from '../utils/validateMethodType.js';
import { validateRequestBody } from '../utils/validateRequestBody.js';
/**
 * An HTTP post method to add one form to the QLDB table.
 */
export const patchFormHandler = async (event: APIGatewayEvent) => {
  let response = validateMethodType(
    event.httpMethod,
    'PATCH',
    'patchFormHandler'
  );
  if (response) {
    return response;
  }

  // All log statements are written to CloudWatch
  console.info('received:', event);

  const id = event.pathParameters!.id!;
  const JSONBody = JSON.parse(event.body!);

  const isValidBody = validateRequestBody(JSONBody, adminNotesSchema);
  if (isValidBody) {
    return isValidBody;
  }

  try {
    await createTableIfNotExists();
    await updateDocumentAdminNotes(id, JSONBody);
    return createResponse(201);
  } catch (error) {
    console.error(error);
    return createResponse(500, 'Error updating database.');
  }
};