'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { useFollowMutation, useUnFollowMutation } from '@/hooks/queries/useFollow';
import { User } from '@/types/schema-validations/account.schema';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  user: User;
}
export default function SuggestedFriend({ user }: Props) {
  const [isFollowed, setIsFollowed] = useState(false);
  const followMutation = useFollowMutation();
  const unFollowMutation = useUnFollowMutation();

  const handleClick = () => {
    if (!isFollowed) {
      followMutation.mutate(user._id);
      setIsFollowed(true);
    } else {
      unFollowMutation.mutate(user._id);
      setIsFollowed(false);
    }
  };

  return (
    <div className='flex items-center px-4 py-2'>
      <div className='mr-2'>
        <Avatar className='z-[-1] size-9'>
          <AvatarImage src={user.avatar} alt={'User avatar'} />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
      </div>
      <div className='flex flex-col'>
        <Link href='/' className='text-sm font-semibold'>
          {user.username}
        </Link>
        <p className='text-xs text-gray-400'>Recommend to you</p>
      </div>
      <div className='ml-auto'>
        {/* <button onClick={handleClick}>
          <span className='text-sm font-medium text-black'>
            {isFollowed ? 'Unfollow' : 'Follow'}
          </span>
        </button> */}
      </div>
    </div>
  );
}
