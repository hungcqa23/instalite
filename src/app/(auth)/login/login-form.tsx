'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast
} from '@/components/ui';
import { GoogleIcon } from '@/components/ui/icons';
import { useLoginMutation } from '@/hooks/queries/useAuth';
import { useUserStore } from '@/stores/user.stores';
import {
  LoginBody,
  LoginBodyType
} from '@/types/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ForgotPassWord = () => {
  return (
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
  );
};

export default function LoginForm() {
  const { toast } = useToast();

  const router = useRouter();
  const { user, setUser } = useUserStore();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const loginMutation = useLoginMutation();

  const handleLoginError = (error: any) => {
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
  };

  async function onSubmit(values: LoginBodyType) {
    toast({
      title: 'Logging in',
      description: 'Please wait...'
    });

    try {
      const result = await loginMutation.mutateAsync(values);
      setTimeout(() => {
        toast({
          title: 'Logged in',
          description: 'Welcome back'
        });
      }, 1000);

      setUser(result.data);
      router.push('/');
    } catch (error: any) {
      handleLoginError(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='h-full w-full'>
        <>
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
        </>

        <>
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
        </>

        {/* <ForgotPassWord /> */}

        <Button className='w-full font-semibold' type='submit'>
          {loginMutation.isPending ? 'Loading...' : 'Sign in'}
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
