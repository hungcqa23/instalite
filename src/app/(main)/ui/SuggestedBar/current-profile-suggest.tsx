'use client';
import { useAppContext } from '@/app/context/app-context';
import IconProfile from '@/components/ui/icon-profile';
import Link from 'next/link';
import React from 'react';

export default function CurrentProfileSuggest() {
  const { user } = useAppContext();

  return (
    <div className='flex items-center gap-2 px-4'>
      <IconProfile
        className='h-10 w-10'
        to={`/username/${user?.username}`}
        src={user?.avatar}
      />

      <div className='flex flex-col'>
        <Link href={`/`} className='text-sm font-semibold'>
          {user?.username}
        </Link>
        <p className='text-sm font-normal leading-4 text-gray-500'>
          {user?.full_name}
        </p>
      </div>
    </div>
  );
}