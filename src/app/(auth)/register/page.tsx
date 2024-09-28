'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { GoogleIcon } from '@/components/ui/icons';
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

const Login = () => (
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
);

const Continue = () => (
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

        <Continue />

        <Button
          className='mt-4 flex w-full items-center gap-1 font-semibold'
          variant={'outline'}
        >
          <GoogleIcon />
          Sign up with Google
        </Button>

        <Login />
      </form>
    </Form>
  );
}
