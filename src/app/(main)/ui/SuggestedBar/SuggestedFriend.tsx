'use client';
import IconProfile from '@/components/ui/icon-profile';
import { User } from '@/schema-validations/account.schema';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  user: User;
}
export default function SuggestedFriend(props: Props) {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div className='flex items-center px-4 py-2'>
      <div className='mr-2'>
        <IconProfile />
      </div>
      <div className='flex flex-col'>
        <Link href='/' className='text-sm font-semibold'>
          {props.user.username}
        </Link>
        <p className='text-xs text-gray-400'>Recommend to you</p>
      </div>
      <div className='ml-auto'>
        <button onClick={() => setIsFollowed(!isFollowed)}>
          <span className='text-sm font-medium text-black'>
            {isFollowed ? 'Unfollow' : 'Follow'}
          </span>
        </button>
      </div>
    </div>
  );
}
