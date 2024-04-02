import { Button } from '@/components/ui/button';

export default function ResetPassword() {
  return (
    <form className='h-full w-full'>
      <p className='mb-4 h-8 text-center text-xl font-semibold'>
        Reset Password
      </p>
      <div>
        <label htmlFor='password' className='mb-2 block text-sm font-semibold'>
          New Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='block h-9 w-full rounded-md border border-gray-300 pl-3 text-sm font-medium outline-none placeholder:font-medium placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300'
          placeholder='Enter your new password'
        />
        <p className='min-h-[20px]'></p>
      </div>
      <div>
        <label htmlFor='password' className='mb-2 block text-sm font-semibold'>
          Confirm New Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='block h-9 w-full rounded-md border border-gray-300 pl-3 text-sm font-medium outline-none placeholder:font-medium placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300'
          placeholder='Confirm your new password'
        />
        <p className='min-h-[20px]'></p>
      </div>
      <Button className='mt-4 w-full font-semibold'>Reset your password</Button>
    </form>
  );
}
