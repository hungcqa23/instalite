import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Login() {
  return (
    <form className='h-full w-full'>
      <p className='h-8 text-center text-xl font-semibold'>Log in</p>
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
      <div>
        <label htmlFor='email' className='mb-2 block text-sm font-semibold'>
          Password
        </label>
        <input
          type='text'
          name='username'
          id='username'
          className='block h-9 w-full rounded border border-gray-300 pl-3 text-sm font-medium placeholder:font-normal placeholder:text-gray-300'
          placeholder='Enter your password here...'
        />
        <p className='min-h-[20px]'></p>
      </div>

      <div className='text-right'>
        <Button className='pr-0' variant={'link'} asChild>
          <Link href='forgot-password'>Forgot password?</Link>
        </Button>
      </div>
      <Button className='w-full font-semibold'>Log in</Button>

      <div className='relative mt-8'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t'></span>
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-white px-2 text-gray-500'>Or continue with</span>
        </div>
      </div>
    </form>
  );
}
