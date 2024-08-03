import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button/button';
import { Account, FollowUser } from '@/schema-validations/account.schema';
import { User } from '@/types/user.type';
import Link from 'next/link';
import React from 'react';

export default function FollowUserItem({ user }: { user: FollowUser }) {
  return (
    <Link
      href={`/username/${user.username}`}
      className='flex h-fit w-full max-w-full flex-col items-start justify-center border-b-[1px] border-gray-300 py-3 dark:border-gray-800'
    >
      <div className='flex w-full max-w-full flex-row gap-3'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={user.avatar} alt='User avatar' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex w-[21.875rem] flex-col'>
          <span className='text-sm font-semibold'>{user.username}</span>
          <div className='text-xs font-normal text-gray-500'>
            {user.full_name}
          </div>
          {/* <div className='mt-1 text-sm font-normal'>
        {user.followersCount} followers
      </div> */}
        </div>
        {/* <div className='flex flex-col justify-center '>
      <Button
        className='mt-1 h-8 rounded-lg px-7 text-sm hover:bg-transparent dark:bg-zinc-950 dark:hover:bg-zinc-950'
        variant={'outline'}
      >
        Follow
      </Button>
    </div> */}
      </div>
    </Link>
  );
}
