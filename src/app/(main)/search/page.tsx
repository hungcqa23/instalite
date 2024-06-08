'use client';

import { useSearch } from '@/app/queries/useSearch';
import { Input } from '@/components/ui/input';
import List from '@/components/ui/list';
import UserItem from '@/components/ui/user';
import { Account } from '@/schema-validations/account.schema';
import { User } from '@/types/user.type';
import { Search } from 'lucide-react';
import { useState } from 'react';

// const userList: User[] = [
//   {
//     _id: '1',
//     avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
//     followersCount: 500,
//     fullName: 'Faker',
//     username: 'faker'
//   },
//   {
//     _id: '2',
//     avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
//     followersCount: 500,
//     fullName: 'Faker',
//     username: 'faker'
//   },
//   {
//     _id: '3',
//     avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
//     followersCount: 500,
//     fullName: 'Faker',
//     username: 'faker'
//   },
//   {
//     _id: '4',
//     avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
//     followersCount: 500,
//     fullName: 'Faker',
//     username: 'faker'
//   },
//   {
//     _id: '5',
//     avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
//     followersCount: 500,
//     fullName: 'Faker',
//     username: 'faker'
//   }
// ];

export default function SearchPage() {
  const [username, setUsername] = useState('');
  const { data: searchData, isLoading } = useSearch(username);

  const users = searchData?.users;

  return (
    <>
      <div className='mt-3 h-fit w-full max-w-[32rem] items-start justify-center'>
        <div className='mb-2 flex flex-row items-center justify-center rounded-3xl border-2 border-gray-300  px-4 py-2'>
          <Search className=' text-gray-400' />
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
