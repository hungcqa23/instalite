'use client';

import authApiRequest from '@/app/api-request/auth';
import { useAppContext } from '@/app/context/app-context';
import { GoogleIcon } from '@/components/icons/google-icon';
import { Button } from '@/components/ui/button/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { useToast } from '@/components/ui/use-toast';
import { LoginBody, LoginBodyType } from '@/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAppContext();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: LoginBodyType) {
    if (loading) return setLoading(true);

    toast({
      title: 'Logging in',
      description: 'Please wait...'
    });

    try {
      const res = await authApiRequest.login(values);
      setUser(res.data);
      setTimeout(() => {
        toast({
          title: 'Logged in',
          description: 'Welcome back'
        });
      }, 1000);

      const responseFromServer = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Logged in successfully'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(getCookie('access_key'));
      router.push('/');
    } catch (error: any) {
      // handleErrorApi({
      //   error,
      //   setError: form.setError
      // });
      const status = error.status as number;
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message
      });

      form.setError('email', {
        type: 'server',
        message: 'Please check your email and password'
      });

      form.setError('password', {
        type: 'server',
        message: 'Please check your email and password'
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='h-full w-full'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
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
        <div className='text-right'>
          <Button className='pr-0' variant={'link'} asChild>
            <Link
              href='forgot-password'
              className='font-semibold hover:no-underline'
            >
              Forgot password?
            </Link>
          </Button>
        </div>

        <Button className='w-full font-semibold' type='submit'>
          Login
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
          type='button'
        >
          <GoogleIcon />
          Sign in with Google
        </Button>

        <div className='mt-4 text-center'>
          <span className='text-md'>Don&apos;t have an account?</span>
          <Button
            className='text-md pl-2 pr-0 font-semibold'
            variant={'link'}
            asChild
          >
            <Link href='register' className='hover:no-underline'>
              Sign up
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
