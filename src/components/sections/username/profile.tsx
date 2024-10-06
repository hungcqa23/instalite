'use client';

import { CustomDialog } from '@/components/customs';
import { AvatarUser, Button, FollowUserItem, List, SkeletonContainer } from '@/components/ui';
import { useGetAllFollowersQuery, useGetAllFollowingsQuery } from '@/hooks/queries/useFollow';
import { useGetUserByUsernameQuery } from '@/hooks/queries/useUser';
import { User } from '@/types/schema-validations/account.schema';
import React from 'react';

export default function Profile({ user, username }: { username: string; user?: User }) {
  const { data, isLoading: isLoadingUser } = useGetUserByUsernameQuery(username);
  const { data: followersData } = useGetAllFollowersQuery(username);
  const followers = followersData?.data || [];

  const { data: followingData } = useGetAllFollowingsQuery(username);
  const following = followingData?.data || [];

  const userData = data?.data;

  return (
    <div className='flex flex-col'>
      <div className='flex h-20 justify-between'>
        <div className='mt-4 flex flex-col items-start justify-start space-y-2'>
          <p className='text-lg font-medium'>{user?.fullName || 'Instalite User'}</p>
          <p className='text-lg font-semibold'>{user?.username}</p>
        </div>

        {!isLoadingUser && <AvatarUser src={userData?.avatar} className='static size-20' />}
        {isLoadingUser && (
          <SkeletonContainer>
            <div className='static size-20 rounded-full bg-slate-200' />
          </SkeletonContainer>
        )}
      </div>

      <div className='mt-4 flex justify-between text-sm'>
        <Button variant={'link'} className='cursor-default p-0 hover:no-underline'>
          <p className='font-light'>
            <span className='font-normal'>{user?.postsCount}</span> posts
          </p>
        </Button>

        {/* Followers */}
        <CustomDialog
          title='Followers'
          classNameContent='w-[456px] dark:bg-zinc-950 sm:max-w-[500px]'
          trigger={
            <Button variant={'link'} className='p-0 hover:no-underline'>
              <p className='font-light'>
                <span className='font-normal'>{followers.length}</span> followers
              </p>
            </Button>
          }
        >
          <div className='h-[30rem] max-h-[30rem]'>
            {followers.length > 0 &&
              List({
                listItems: followers,
                mapFn: followers => (
                  <FollowUserItem key={followers._id} user={followers.followedUserId} />
                ),
                as: 'ul'
              })}
          </div>
        </CustomDialog>

        {/* Following */}
        <CustomDialog
          title='Following'
          classNameContent='w-[456px] dark:bg-zinc-950 sm:max-w-[500px]'
          trigger={
            <Button variant={'link'} className='p-0 hover:no-underline'>
              <p className='font-light'>
                <span className='font-normal'>{following.length}</span> following
              </p>
            </Button>
          }
        >
          <div className='h-[30rem] max-h-[30rem]'>
            {following.length > 0 &&
              List({
                listItems: following,
                mapFn: followingUser => (
                  <FollowUserItem key={followingUser._id} user={followingUser.followedUserId} />
                ),
                as: 'ul'
              })}
          </div>
        </CustomDialog>
      </div>
      <div className='my-3.5 max-w-full text-sm'>{user?.bio}</div>
    </div>
  );
}
