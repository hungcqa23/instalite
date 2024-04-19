import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <form className='h-full w-full'>
      <p className='h-8 text-center text-2xl font-semibold md:text-xl'>
        Forgot Password
      </p>
      <p className='py-2 pb-4 text-sm'>
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
          className='block h-9 w-full rounded-md border border-gray-300 pl-3 text-xs font-medium outline-none placeholder:font-medium placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300'
          placeholder='Enter your email here...'
        />
        <p className='min-h-[20px]'></p>
      </div>

      <Button className='w-full font-semibold'>Request password reset</Button>
    </form>
  );
}
