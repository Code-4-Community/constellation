import { APIGatewayEvent } from 'aws-lambda';
import { insertDocument } from '../db/utils.js';
import { formSchema } from '../schema/schema.js';

/**
 * An HTTP post method to add one form to the QLDB table.
 */
export const putFormHandler = async (event: APIGatewayEvent) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 200,
            body: `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
        }
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const JSONbody = JSON.parse(event.body!);
    let form;
    try {
        form = formSchema.parse(JSONbody);
    } catch (error) {
        return {
            statusCode: 200,
            body: 'Form body does not match schema. Error: ' + error
        }
    }


    await insertDocument(form);

    const response = {
        statusCode: 200,
        body: JSON.stringify(form),
    };

    // All log statements are written to CloudWatch
    console.info(
        `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
};
