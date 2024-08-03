'use client';

import { Button } from '@/components/ui/button/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    username: z.string().min(1, {
      message: 'Required'
    }),
    email: z.string().email(),
    password: z.string().min(3, {
      message: 'Password must be at least 3 characters.'
    }),
    passwordConfirm: z.string()
  })
  .refine(
    data => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Password do not match',
      path: ['passwordConfirm'] // field that message belongs to
    }
  );

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      username: '',
      email: '',
      passwordConfirm: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <p className='mb-2 h-8 text-center text-xl font-semibold'>
        Create an account
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className='h-full w-full'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your username'
                  {...field}
                  type='email'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='min-h-[20px]'></p>
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your password'
                  {...field}
                  type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='min-h-[20px]'></p>
        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Confirm your password'
                  {...field}
                  type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='min-h-[20px]'></p>
        <Button className='mt-3 w-full font-semibold' type='submit'>
          Create your account
        </Button>
        <div className='relative mt-8'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t'></span>
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white px-2 text-gray-400 dark:bg-black'>
              Or continue with
            </span>
          </div>
        </div>
        <Button
          className='mt-4 flex w-full items-center gap-1 font-semibold'
          variant={'outline'}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14.537 6.69437H14V6.66671H8.00004V9.33337H11.7677C11.218 10.8857 9.74104 12 8.00004 12C5.79104 12 4.00004 10.209 4.00004 8.00004C4.00004 5.79104 5.79104 4.00004 8.00004 4.00004C9.01971 4.00004 9.94737 4.38471 10.6537 5.01304L12.5394 3.12737C11.3487 2.01771 9.75604 1.33337 8.00004 1.33337C4.31837 1.33337 1.33337 4.31837 1.33337 8.00004C1.33337 11.6817 4.31837 14.6667 8.00004 14.6667C11.6817 14.6667 14.6667 11.6817 14.6667 8.00004C14.6667 7.55304 14.6207 7.11671 14.537 6.69437Z'
              fill='#FFC107'
            />
            <path
              d='M2.10205 4.89704L4.29238 6.50337C4.88505 5.03604 6.32038 4.00004 8.00005 4.00004C9.01972 4.00004 9.94738 4.38471 10.6537 5.01304L12.5394 3.12737C11.3487 2.01771 9.75605 1.33337 8.00005 1.33337C5.43938 1.33337 3.21872 2.77904 2.10205 4.89704Z'
              fill='#FF3D00'
            />
            <path
              d='M7.99994 14.6667C9.72194 14.6667 11.2866 14.0077 12.4696 12.936L10.4063 11.19C9.71446 11.7161 8.86909 12.0007 7.99994 12C6.26594 12 4.79361 10.8943 4.23894 9.35132L2.06494 11.0263C3.16827 13.1853 5.40894 14.6667 7.99994 14.6667Z'
              fill='#4CAF50'
            />
            <path
              d='M14.537 6.69429H14V6.66663H8V9.33329H11.7677C11.5047 10.0721 11.0311 10.7177 10.4053 11.1903L10.4063 11.1896L12.4697 12.9356C12.3237 13.0683 14.6667 11.3333 14.6667 7.99996C14.6667 7.55296 14.6207 7.11663 14.537 6.69429Z'
              fill='#1976D2'
            />
          </svg>
          Sign up with Google
        </Button>

        <div className='mt-4 text-center'>
          <span className='text-md'>Already have an account?</span>
          <Button
            className='text-md pl-2 pr-0 font-semibold'
            variant={'link'}
            asChild
          >
            <Link href='login' className='hover:no-underline'>
              Sign in
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
