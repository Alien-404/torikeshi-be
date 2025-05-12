import { createCustomError } from '@common/contracts/response';
import { config } from '@config/index';
import { verify } from 'hono/jwt';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    switch (error.name) {
      case 'JwtTokenExpired':
        return 'Token expired.';
      case 'JwtTokenInvalid':
      case 'JwtTokenMalformed':
        return 'Invalid token.';
      default:
        return 'Authentication failed.';
    }
  }
  return 'An unexpected error occurred.';
};

export const verifyToken = async (
  token: string,
  secret: string = config.SECRET_KEY
): Promise<any> => {
  try {
    const decodedPayload = await verify(token, secret);
    return decodedPayload;
  } catch (error) {
    const message = getErrorMessage(error);
    throw createCustomError(message, 401);
  }
};
