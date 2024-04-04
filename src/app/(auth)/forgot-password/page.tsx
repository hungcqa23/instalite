'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email()
});

export default function ForgotPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='h-full w-full'>
        <p className='h-8 text-center text-xl font-semibold'>Forgot Password</p>
        <p className='py-2 pb-4'>
          Please enter the email address you&apos;d like your password reset
          information sent to{' '}
        </p>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} type='email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='min-h-[20px]'></p>
        <Button className='w-full font-semibold'>Request password reset</Button>
      </form>{' '}
    </Form>
  );
}

{
  /* <form className='h-full w-full'>
      <p className='h-8 text-center text-xl font-semibold'>Forgot Password</p>
      <p className='py-2 pb-4'>
        Please enter the email address you&apos;d like your password reset
        information sent to{' '}
      </p>
      <div>
        <label htmlFor='email' className='mb-2 block text-sm font-semibold'>
          Email
        </label>
        <input
          type='text'
          name='username'
          id='username'
          className='block h-9 w-full rounded-md border border-gray-300 pl-3 text-sm font-medium outline-none placeholder:font-medium placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300'
          placeholder='Enter your email here...'
        />
        <p className='min-h-[20px]'></p>
      </div>

      <Button className='w-full font-semibold'>Request password reset</Button>
    </form> */
}
