import { sign } from 'hono/jwt';

export const generateToken = async (
  data: any,
  expired: number,
  secret: string
): Promise<string> => {
  const token = await sign({ ...data, exp: expired }, secret);
  return token;
};
