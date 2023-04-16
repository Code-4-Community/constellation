import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { updateDocumentAdminNotes } from '../db/utils.js';
import { AdminNotes, adminNotesSchema } from '../schema/schema.js';
/**
 * An HTTP post method to add one form to the QLDB table.
 */
export const patchFormHandler = async (event: APIGatewayEvent) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH',
  };

  if (event.httpMethod !== 'PATCH') {
    return {
      statusCode: 400,
      headers,
      body: `patchMethod only accepts PATCH method, you tried: ${event.httpMethod} method.`,
    };
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  const id = event.pathParameters!.id!;
  const JSONbody = JSON.parse(event.body!);
  let notes: AdminNotes;
  try {
    notes = adminNotesSchema.parse(JSONbody);
  } catch (error) {
    const errorMessage = 'Admin notes does not match schema. Error: ' + error;
    console.error(errorMessage);
    return {
      statusCode: 400,
      headers,
      body: errorMessage,
    };
  }

  try {
    await createTableIfNotExists();
    await updateDocumentAdminNotes(id, notes);
    return {
      statusCode: 201,
      headers,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: 'Error updating database.',
    };
  }
};
