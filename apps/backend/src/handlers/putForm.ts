import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { insertDocument } from '../db/utils.js';
import { formSchema } from '../schema/schema.js';

/**
 * An HTTP post method to add one form to the QLDB table.
 */
export const putFormHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    }
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  const JSONbody = JSON.parse(event.body!);
  let form;
  try {
    form = formSchema.parse(JSONbody);
  } catch (error) {
    return {
      statusCode: 400,
      body: 'Form body does not match schema. Error: ' + error
    }
  }

  await createTableIfNotExists();
  await insertDocument(form);

  const response = {
    statusCode: 201,
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode}`
  );
  return response;
};
