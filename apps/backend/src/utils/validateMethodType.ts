import { createResponse } from './createResponse.js';

/** Check if http method type matches the type of the handler */
export const validateMethodType = (
  type: string,
  expectedType: string,
  endpointName: string
) => {
  if (type !== expectedType) {
    return createResponse(
      400,
      `${endpointName} only accepts ${expectedType} method, you tried: ${type} method.`
    );
  }
};
