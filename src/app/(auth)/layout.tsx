'use client';
import { OrbitIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

const testimonials = [
  {
    path: 'login',
    text: '“A game-changing social app that seamlessly blends sleek design, innovative features, and user-friendly functionality.”',
    title: 'Log in'
  },
  {
    path: 'register',
    text: '“Instalite is my go-to social app, redefining the world of social networking.”',
    title: 'Register'
  },
  {
    path: 'forgot-password',
    text: '“Instalite is my go-to social app, redefining the world of social networking.”',
    title: 'Forgot Password'
  },
  {
    path: 'reset-password',
    text: '“Instalite is my go-to social app, redefining the world of social networking.”',
    title: 'Reset Password'
  }
];
export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className='flex h-screen w-screen justify-center md:justify-normal'>
      <div className='hidden basis-1/2 flex-col justify-between bg-black p-10 font-semibold text-white md:flex'>
        <div className='flex items-center gap-2 text-white'>
          <OrbitIcon color='white' size={32} />
          <span>Instalite</span>
        </div>
        <div className='text-white'>
          <p className='w-3/4'>
            {testimonials.find(t => `/${t.path}` === pathname)?.text}
          </p>
          <p className='mt-3 w-3/4 font-semibold'>
            Cao Quảng An Hưng - user of Instalite
          </p>
        </div>
      </div>
      <div className='relative h-full basis-1/2 p-10 font-medium text-black'>
        <p className='absolute right-10 top-10 hidden text-right text-sm md:inline'>
          {testimonials.find(t => `/${t.path}` === pathname)?.title}
        </p>
        <div className='flex h-full items-center justify-center '>
          <div className='w-[21.875rem]'>{children}</div>
        </div>
      </div>
    </div>
  );
}
