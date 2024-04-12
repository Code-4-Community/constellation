import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { markFormAsRead } from '../db/utils.js';
import { createResponse } from '../utils/createResponse.js';
import { validateMethodType } from '../utils/validateMethodType.js';
import { validateRequestBody } from '../utils/validateRequestBody.js';
import { readSchema } from '../schema/schema.js';
/**
 * An HTTP patch method to mark a form as read in the QLDB table.
 */
export const markFormAsReadHandler = async (event: APIGatewayEvent) => {
  let response = validateMethodType(
    event.httpMethod,
    'PATCH',
    'markFormAsRead',
  );
  if (response) {
    return response;
  }

  // All log statements are written to CloudWatch
  console.info('received:', event);

  const id = event.pathParameters!.id!;
  const JSONBody = JSON.parse(event.body!);

  const isInvalidBody = validateRequestBody(JSONBody, readSchema);
  if (isInvalidBody) {
    return isInvalidBody;
  }

  try {
    await createTableIfNotExists();
    // Check if the "read" property is included in the request body
    if (JSONBody.hasOwnProperty('read')) {
      // If the "read" property is included, update the document's "read" property
      await markFormAsRead(id);
    }
    return createResponse(201);
  } catch (error) {
    console.error(error);
    return createResponse(500, 'Error updating database.');
  }
};
