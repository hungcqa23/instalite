'use client';

import { UserAvatar } from '@/components/sections/home/user-avatar';
import { useUserStore } from '@/stores/user.stores';
import Link from 'next/link';
import React, { use } from 'react';

export default function CurrentProfileSuggest() {
  const { user } = useUserStore();

  return (
    <div className='flex items-center gap-2 px-4'>
      <div className='flex items-center gap-2'>
        <UserAvatar />
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
