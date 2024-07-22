'use server';

import { primaryPlayerSchema } from '@/app/get-started/player/schemas/primaryPlayerSchema';
import { createClient } from '@/lib/supabase/server';
import { FormResponseState } from '@/types/formState';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function insertPrimaryPlayer(
  prevState: FormResponseState | null,
  data: FormData
): Promise<FormResponseState> {
  try {
    const submission = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
    };

    const { firstName, lastName } = primaryPlayerSchema.parse(submission);

    const supabase = createClient();
    await supabase
      .from('player')
      .insert({ first_name: firstName, last_name: lastName, primary: true })
      .throwOnError();
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return {
        status: 'error',
        message: 'Please fill out the form completely',
        errors: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      };
    }
    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    };
  }

  revalidatePath('/');
  redirect('/private');
}
