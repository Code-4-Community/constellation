import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { insertDocument } from '../db/utils.js';
import { formSchema } from '../schema/schema.js';
import { v4 as uuidv4 } from 'uuid';
import { createResponse } from '../utils/createResponse.js';
/**
 * An HTTP post method to add one form to the QLDB table.
 */
export const putFormHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    return createResponse(
      400,
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  const JSONbody = JSON.parse(event.body!);
  let form;
  try {
    form = formSchema.parse(JSONbody);
    form.id = uuidv4();
  } catch (error) {
    return createResponse(
      400,
      `Form body does not match schema. Error: ${error}`
    );
  }

  await createTableIfNotExists();
  await insertDocument(form);

  const response = createResponse(200);

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode}`
  );
  return response;
};
