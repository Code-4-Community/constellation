import { APIGatewayEvent } from 'aws-lambda';
import { createTableIfNotExists } from '../db/createTable.js';
import { insertDocument } from '../db/utils.js';
import { formSchema } from '../schema/schema.js';
import { v4 as uuidv4 } from 'uuid';
import { createResponse } from '../utils/createResponse.js';
import { validateMethodType } from '../utils/validateMethodType.js';
import { validateRequestBody } from '../utils/validateRequestBody.js';
import { parse } from 'csv-parse';

/**
 * An HTTP put method to add multiple forms to the QLDB table.
 */
export const postMultipleCSVFormsHandler = async (event: APIGatewayEvent) => {
  let isValidResponse = validateMethodType(
    event.httpMethod,
    'POST',
    'postMultipleCSVFormsHandler'
  );
  if (isValidResponse) {
    return isValidResponse;
  }

  // All log statements are written to CloudWatch
  console.info('received:', event);

  let JSONBody = JSON.parse(event.body!);
  const csvData = JSONBody.csvData;
  let hasInvalidBody = null;
  const placeholderDate = '1900-01-01';
  await createTableIfNotExists();
  const recordsToBeInserted: JSON[] = [];
  // Parse the CSV data and store it in an array
  const records: any[][] = await new Promise((resolve, reject) => {
    const output: any[][] = [];
    parse(csvData, {
      trim: true,
      skip_empty_lines: true,
    })
      .on('readable', function (this: any) {
        let record;
        while ((record = this.read()) !== null) {
          output.push(record);
        }
      })
      .on('end', () => resolve(output))
      .on('error', (err) => reject(err));
  });
  // Create a JSON object for each form and insert it into the table
  records.slice(1).forEach((record: any[]) => {
    const form = JSON.stringify({
      id: uuidv4(),
      financialAssistanceForm: {
        date: new Date(record[0]).toISOString(),
        childsName: record[1],
        dob: new Date(record[2]).toISOString(),
        guardianName: record[3],
        childsDiagnosis: 'N/A',
        childsPhysician: record[9],
        dateOfDiagnosis: new Date(placeholderDate).toISOString(),
        hospital: record[10],
        hospitalAddress: {
          street: 'N/A',
          city: 'N/A',
          state: 'N/A',
          zipcode: '00000',
        },
        requestedGrantAmount:
          record[6] === '' ? undefined : parseInt(record[6]),
        intendedUseOfGrant: record[7],
        medicalProfessionalPhone: '000-000-0000',
        medicalProfessionalEmail: 'placeholder@gmail.com',
        notes: record[12],
      },
      read: false,
      adminNotes: [],
    });

    JSONBody = JSON.parse(form);

    let isValidBody = validateRequestBody(JSONBody, formSchema);
    if (isValidBody) {
      hasInvalidBody = isValidBody;
      return isValidBody;
    }
    recordsToBeInserted.push(JSONBody);
  });

  if (hasInvalidBody) {
    return hasInvalidBody;
  }

  await insertDocument(recordsToBeInserted);

  const response = createResponse(201);
  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode}`
  );
  return response;
};
