'use client';

import { IconProfile } from '@/components/ui';
import { useFollowMutation, useUnFollowMutation } from '@/hooks/queries/useFollow';
import { User } from '@/types/schema-validations/account.schema';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  user: User;
}
export default function SuggestedFriend(props: Props) {
  const [isFollowed, setIsFollowed] = useState(false);
  const followMutation = useFollowMutation();
  const unFollowMutation = useUnFollowMutation();

  const handleClick = () => {
    if (!isFollowed) {
      followMutation.mutate(props.user._id);
      setIsFollowed(true);
    } else {
      unFollowMutation.mutate(props.user._id);
      setIsFollowed(false);
    }
  };

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
        <button onClick={handleClick}>
          <span className='text-sm font-medium text-black'>
            {isFollowed ? 'Unfollow' : 'Follow'}
          </span>
        </button>
      </div>
    </div>
  );
}
