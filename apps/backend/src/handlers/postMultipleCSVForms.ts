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
    'postMultipleCSVFormsHandler',
  );
  if (isValidResponse) {
    return isValidResponse;
  }

  // All log statements are written to CloudWatch
  console.info('received:', event);

  let JSONBody = JSON.parse(event.body!);
  const csvData = JSONBody.csvData;
  let hasInvalidBody = null;

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
        childsName: record[0],
        dob: new Date(record[1]).toISOString(),
        guardianName: record[2],
        childsDiagnosis: record[3],
        otherDiagnosis: record[4] === '' ? undefined : record[4],
        dateOfDiagnosis: new Date(record[5]).toISOString(),
        childsPhysician: record[6],
        hospital: record[7],
        otherHospital: record[8] === '' ? undefined : record[8],
        hospitalAddress: {
          street: record[9],
          city: record[10],
          state: record[11],
          zipcode: record[12],
        },
        requestedGrantAmount: parseInt(record[13]),
        intendedUseOfGrant: record[14],
        medicalProfessionalPhone: record[15],
        medicalProfessionalEmail: record[16],
        notes: record[17],
        date: new Date(record[18]).toISOString(),
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
    `response from: ${event.path} statusCode: ${response.statusCode}`,
  );
  return response;
};
