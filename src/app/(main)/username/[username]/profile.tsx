'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import FollowUserItem from '@/components/ui/follow-user-item';
import List from '@/components/ui/list';
import { http } from '@/lib/http';
import { FollowUser } from '@/schema-validations/account.schema';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function Profile({ data }: { data: any }) {
  const { user } = data;

  const [followedUsers, setFollowedUsers] = useState<FollowUser[]>([]);
  const [followers, setFollowers] = useState<FollowUser[]>([]);

  const getAllFollowerMutation = useMutation({
    mutationFn: async () => {
      return await http.get(`/users/${user?.username}/followers`);
    }
  });

  const handleGetAllFollower = async () => {
    const res = await getAllFollowerMutation.mutateAsync();

    const followerList: FollowUser[] = res.data.map(
      (item: { user_id: any }) => {
        const follower = item.user_id;
        return {
          _id: follower._id,
          username: follower.username,
          avatar:
            follower.avatar ||
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          full_name: follower.full_name || 'Instalite User'
        };
      }
    );

    setFollowers(followerList);
  };

  const getAllFollowingsMutation = useMutation({
    mutationFn: async () => {
      return await http.get(`/users/${user?.username}/followings`);
    }
  });

  const handleGetAllFollowings = async () => {
    const res = await getAllFollowingsMutation.mutateAsync();

    const followedUsersList: FollowUser[] = res.data.map(
      (item: { followed_user_id: any }) => {
        const followedUser = item.followed_user_id;
        return {
          _id: followedUser._id,
          username: followedUser.username,
          avatar:
            followedUser.avatar ||
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          full_name: followedUser.full_name || 'Instalite User'
        };
      }
    );

    setFollowedUsers(followedUsersList);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex h-20 justify-between'>
        <div className='mt-4 flex flex-col items-start justify-start space-y-2'>
          <p className='text-lg font-medium'>
            {user?.full_name || 'Instalite User'}
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
            <span className='font-normal'>{user?.posts_count}</span> posts
          </p>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'link'}
              className='p-0 hover:no-underline'
              onClick={() => handleGetAllFollower()}
            >
              <p className='font-light'>
                <span className='font-normal'>{user?.followers_count}</span>{' '}
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
              {List<FollowUser>({
                listItems: followers,
                mapFn: user => <FollowUserItem key={user._id} user={user} />,
                as: 'ul'
              })}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'link'}
              className='p-0 hover:no-underline'
              onClick={() => handleGetAllFollowings()}
            >
              <p className='font-light'>
                <span className='font-normal'>{user?.following_count}</span>{' '}
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
              {List<FollowUser>({
                listItems: followedUsers,
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
