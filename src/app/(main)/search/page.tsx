'use client';

import { Input, List, UserItem } from '@/components/ui';
import { Search } from '@/components/ui/icons';
import { useSearch } from '@/queries/useSearch';
import { Account } from '@/types/schema-validations/account.schema';
import { useState } from 'react';

export default function SearchPage() {
  const [username, setUsername] = useState('');
  const { data: searchData, isLoading } = useSearch(username);

  const users = searchData?.users;

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

        {username === '' && <div />}

        {username !== '' &&
          List<Account>({
            listItems: users,
            mapFn: user => <UserItem key={user._id} user={user} />,
            as: 'ul'
          })}
      </div>
    </>
  );
}
