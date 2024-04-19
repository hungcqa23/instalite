import LoginForm from '@/app/(auth)/login/login-form';
import React from 'react';

export default function Login() {
  return (
    <div>
      <p className='mb-2 h-8 text-center text-xl font-semibold'>Log in</p>
      <LoginForm />
    </div>
  );
}
