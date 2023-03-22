import { APIGatewayEvent } from 'aws-lambda';
import { fetchDocuments } from '../db/utils.js';

/**
 * An HTTP get method to get all forms from the QLDB table.
 */
export const getAllFormsHandler = async (event: APIGatewayEvent) => {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 400,
            body: `getMethod only accepts GET method, you tried: ${event.httpMethod} method.`
        }
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    const allForms = await fetchDocuments();

    const response = {
        statusCode: 201,
        data: { allForms }
    };

    // All log statements are written to CloudWatch
    console.info(
        `response from: ${event.path} statusCode: ${response.statusCode}`
    );

    return response;
};