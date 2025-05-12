import { z } from 'zod';

export const loginSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict()
  .required();

export type LoginTypeReq = z.infer<typeof loginSchema>;
