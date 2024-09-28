'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FollowUserItem,
  List
} from '@/components/ui';
import {
  useGetAllFollowersQuery,
  useGetAllFollowingsQuery
} from '@/hooks/queries/useFollow';
import { User } from '@/types/schema-validations/account.schema';
import React from 'react';

export default function Profile({
  user,
  isFollowing,
  username
}: {
  username: string;
  user?: User;
  isFollowing: boolean;
}) {
  const { data: followersData } = useGetAllFollowersQuery(username);
  const followers = followersData?.data;
  const { data: followingData } = useGetAllFollowingsQuery(username);
  const following = followingData?.data;

  return (
    <div className='flex flex-col'>
      <div className='flex h-20 justify-between'>
        <div className='mt-4 flex flex-col items-start justify-start space-y-2'>
          <p className='text-lg font-medium'>
            {user?.fullName || 'Instalite User'}
          </p>
          <p className='text-lg font-semibold'>{user?.username}</p>
        </div>

        <Avatar className='static h-20 w-20'>
          <AvatarImage
            src={user?.avatar ?? 'https://github.com/shadcn.png'}
            alt='@shadcn'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className='mt-4 flex justify-between text-sm'>
        <Button
          variant={'link'}
          className='cursor-default p-0 hover:no-underline'
        >
          <p className='font-light'>
            <span className='font-normal'>{user?.postsCount}</span> posts
          </p>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'link'} className='p-0 hover:no-underline'>
              <p className='font-light'>
                <span className='font-normal'>{user?.followersCount}</span>{' '}
                followers
              </p>
            </Button>
          </DialogTrigger>

          <DialogContent className='w-[456px] dark:bg-zinc-950 sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle className='flex justify-center text-sm font-bold'>
                Followers
              </DialogTitle>
            </DialogHeader>

            <div className='h-[30rem] max-h-[30rem]'>
              {followers &&
                followers.length > 0 &&
                List<User>({
                  listItems: followers,
                  mapFn: user => <FollowUserItem key={user._id} user={user} />,
                  as: 'ul'
                })}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'link'} className='p-0 hover:no-underline'>
              <p className='font-light'>
                <span className='font-normal'>{user?.followingCount}</span>
                following
              </p>
            </Button>
          </DialogTrigger>
          <DialogContent className='w-[456px] dark:bg-zinc-950 sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle className='flex justify-center text-sm font-bold'>
                Following
              </DialogTitle>
            </DialogHeader>

            <div className='h-[30rem] max-h-[30rem]'>
              {following &&
                following.length > 0 &&
                List<User>({
                  listItems: following,
                  mapFn: user => <FollowUserItem key={user._id} user={user} />,
                  as: 'ul'
                })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className='my-3.5 max-w-full text-sm'>{user?.bio}</div>
    </div>
  );
}
