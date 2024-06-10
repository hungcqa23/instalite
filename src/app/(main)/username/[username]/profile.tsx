'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

export default function Profile({ data }: { data: any }) {
  const { user } = data;

  return (
    <div className='flex flex-col'>
      <div className='flex h-20 justify-between'>
        <div className='mt-4 flex flex-col items-start justify-start space-y-2'>
          <p className='text-lg font-medium'>{user?.full_name}</p>
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
            <Button variant={'link'} className='p-0 hover:no-underline'>
              <p className='font-light'>
                <span className='font-normal'>{user?.followers_count}</span>{' '}
                followers
              </p>
            </Button>
          </DialogTrigger>

          <DialogContent className='dark:bg-zinc-950 sm:max-w-[31.25rem]'>
            <DialogHeader>
              <DialogTitle className='flex justify-center text-sm font-bold'>
                Followers
              </DialogTitle>
            </DialogHeader>
            <div className='flex flex-row items-center justify-center border-b-2 border-t-2 border-gray-300 py-2'>
              <Search className=' text-gray-400' />
              <Input
                placeholder='Search for user'
                className='border-none focus-visible:ring-0'
              />
            </div>
            <div className='h-[300px]'></div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'link'} className='p-0 hover:no-underline'>
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

            <div className='flex flex-row items-center justify-center border-b-2 border-t-2 border-gray-300 py-2'>
              <Search className=' text-gray-400' />
              <Input
                placeholder='Search for user'
                className='border-none focus-visible:ring-0'
              />
            </div>
            <div className='h-[300px]'></div>
          </DialogContent>
        </Dialog>
      </div>
      <div className='my-3.5 max-w-full text-sm'>good things take time ✨</div>
    </div>
  );
}
