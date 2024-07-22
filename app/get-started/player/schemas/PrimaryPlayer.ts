import { z } from 'zod';

export const primaryPlayerSchema = z.object({
  firstName: z.string().min(1, { message: 'Required' }),
  lastName: z.string().min(1, { message: 'Required' }),
});

export type PrimaryPlayer = z.infer<typeof primaryPlayerSchema>;
