import type { CustomError } from '@common/contracts/type';

// Define the structure for successful responses
interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

// Define the structure for fail responses
interface FailResponse {
  success: false;
  message: string;
  data: null;
}

// Define the structure for error responses
interface ErrorResponse {
  success: false;
  error: {
    requestId: string;
    message: string;
  };
}

// Helper functions to create standardized responses
function createSuccessResponse<T>(
  data: T,
  message: string = 'success'
): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

function createFailResponse(message: string): FailResponse {
  return {
    success: false,
    message: message,
    data: null,
  };
}

function createErrorResponse(
  requestId: string,
  message: string
): ErrorResponse {
  return {
    success: false,
    error: {
      requestId,
      message,
    },
  };
}

function createCustomError(message: string, status: number): CustomError {
  const err = new Error(message) as CustomError;
  err.status = status;
  return err;
}

export {
  createSuccessResponse,
  createErrorResponse,
  createFailResponse,
  createCustomError,
};
