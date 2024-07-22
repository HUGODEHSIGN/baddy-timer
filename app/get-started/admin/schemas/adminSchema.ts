import { z } from 'zod';

export const adminSchema = z.object({
  firstName: z.string().min(1, { message: 'Required' }),
  lastName: z.string().min(1, { message: 'Required' }),
});

export type Admin = z.infer<typeof adminSchema>;
