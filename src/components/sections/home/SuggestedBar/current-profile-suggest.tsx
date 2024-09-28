'use client';

import { useAppContext } from '@/app/context/app-provider';
import UserAvatar from '@/components/sections/home/user-avatar';
import IconProfile from '@/components/ui/icon-profile';
import Link from 'next/link';
import React from 'react';

export default function CurrentProfileSuggest() {
  const { user } = useAppContext();

  return (
    <div className='flex items-center gap-2 px-4'>
      <div className='flex flex-col'>
        <Link href={`/`} className='text-sm font-semibold'>
          {user?.username}
        </Link>
        <p className='mt-1 text-sm font-normal leading-4 text-gray-500'>
          {user?.fullName}
        </p>
      </div>
    </div>
  );
}
