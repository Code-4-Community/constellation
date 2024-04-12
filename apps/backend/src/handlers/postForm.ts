import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { insertDocument } from '../db/utils.js';
import { formSchema } from '../schema/schema.js';
import { v4 as uuidv4 } from 'uuid';
import { createResponse } from '../utils/createResponse.js';
import { validateMethodType } from '../utils/validateMethodType.js';
import { validateRequestBody } from '../utils/validateRequestBody.js';
/**
 * An HTTP post method to add one form to the QLDB table.
 */
export const postFormHandler = async (event: APIGatewayEvent) => {
  let isValidResponse = validateMethodType(
    event.httpMethod,
    'POST',
    'postFormHandler',
  );
  if (isValidResponse) {
    return isValidResponse;
  }

  // All log statements are written to CloudWatch
  console.info('received:', event);

  const JSONBody = JSON.parse(event.body!);
  JSONBody.id = uuidv4();
  let isValidBody = validateRequestBody(JSONBody, formSchema);
  if (isValidBody) {
    return isValidBody;
  }

  await createTableIfNotExists();
  await insertDocument(JSONBody);

  const response = createResponse(201);
  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode}`,
  );
  return response;
};
