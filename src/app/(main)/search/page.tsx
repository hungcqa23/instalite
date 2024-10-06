'use client';

import { Search } from '@/components/icons';
import { Input, SkeletonContainer, UserItem } from '@/components/ui';
import { useSearch } from '@/hooks/queries/useSearch';
import { useDebounce } from '@/hooks/use-debounce';
import { useState } from 'react';
import React from 'react';

export default function SearchPage() {
  const [username, setUsername] = useState('');
  const debouncedUsername = useDebounce(username, 1000);
  const { data: searchData, isPending } = useSearch(debouncedUsername);

  const users = searchData?.data || [];

  return (
    <>
      <div className='mt-3 h-fit w-full max-w-[32rem] items-start justify-center'>
        <div className='mb-2 flex flex-row items-center justify-center rounded-3xl border-2 border-gray-300 px-4 py-2'>
          <Search className='text-gray-400' />
          <Input
            placeholder='Search for user'
            className='border-none focus-visible:ring-0'
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        {/* Handle loading state */}
        {username && isPending && (
          <SkeletonContainer className='text-center'>
            {Array.from(Array(10).keys()).map(i => (
              <div className='mb-4 flex h-9 w-full gap-2' key={i}>
                <div className='size-8 shrink-0 rounded-full bg-slate-200' />
                <div className='flex w-full flex-col gap-2'>
                  <div className='h-3 w-full rounded-lg bg-slate-200' />
                  <div className='h-3 w-full rounded-lg bg-slate-200' />
                </div>
              </div>
            ))}
          </SkeletonContainer>
        )}

        {/* Display user search results */}
        {username && users.length > 0 && (
          <ul>
            {users.map(user => (
              <UserItem key={user._id} user={user} />
            ))}
          </ul>
        )}

        {/* Handle no results */}
        {debouncedUsername && !isPending && users.length === 0 && (
          <div className='text-center text-gray-500'>No users found...</div>
        )}
      </div>
    </>
  );
}
