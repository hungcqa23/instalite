'use client';

import { CurrentUserAvatar } from '@/components/sections/home/current-user-avatar';
import { useUserStore } from '@/stores/user.stores';
import Link from 'next/link';
import React from 'react';

export default function CurrentProfileSuggest() {
  const { user } = useUserStore();

  return (
    <div className='flex items-center gap-2 px-4'>
      <div className='flex items-center gap-2'>
        <CurrentUserAvatar />
        <div>
          <Link href={`/`} className='text-sm font-semibold'>
            {user?.username}
          </Link>
          <p className='mt-1 text-sm font-normal leading-4 text-gray-500'>{user?.fullName}</p>
        </div>
      </div>
    </div>
  );
}
