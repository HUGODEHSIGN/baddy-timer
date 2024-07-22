'use client';

import { insertAdmin } from '@/app/get-started/admin/actions/insertAdminAction';
import {
  Admin,
  adminSchema,
} from '@/app/get-started/admin/schemas/adminSchema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormResponseState } from '@/types/formState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { FieldPath, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function InsertAdminForm() {
  const [state, submitAction] = useFormState<FormResponseState, FormData>(
    insertAdmin,
    null
  );

  const form = useForm<Admin>({
    resolver: zodResolver(adminSchema),
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const {
    formState: { isValid, errors },
    setError,
  } = form;

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status === 'error') {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<Admin>, {
          message: error.message,
        });
      });
      toast.error(state.message);
    }
    if (state.status === 'success') {
      toast.success(state.message);
    }
  });

  return (
    <>
      <Form {...form}>
        <form
          action={submitAction}
          className="flex flex-col gap-4">
          {/* first name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>Your display name</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* last name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>Your display name</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {/* submit */}
          <Button
            type="submit"
            disabled={!isValid}>
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
}
