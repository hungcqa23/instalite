'use client';
import { useAppContext } from '@/app/context/app-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Account } from '@/schema-validations/account.schema';
import React from 'react';

interface Props {
  user: Account;
}
export default function BtnCta({ user }: Props) {
  const { user: currentUser } = useAppContext();

  return (
    <>
      {user?.username !== currentUser?.username && (
        <div className='flex flex-row gap-2'>
          <Button
            className='mt-3.5 w-full text-sm dark:bg-zinc-50 dark:hover:bg-zinc-50'
            variant={'default'}
          >
            Follow
          </Button>
          <Button
            className='mt-3.5 w-full text-sm dark:bg-zinc-950 dark:hover:bg-transparent'
            variant={'outline'}
          >
            Mention
          </Button>
        </div>
      )}
      {user?.username === currentUser?.username && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className='mt-3.5 w-full text-sm dark:bg-zinc-950 dark:hover:bg-transparent'
              variant={'outline'}
            >
              Edit profile
            </Button>
          </DialogTrigger>
          <DialogContent className='dark:bg-zinc-950 sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle className='flex justify-center text-sm font-bold'>
                Profile
              </DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row justify-between '>
                <div className='flex flex-col'>
                  <Label className='text-sm font-semibold'>Username</Label>
                  <Input
                    className='mt-1 w-[378px] '
                    placeholder='Enter your username'
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className='mt-2.5 h-[50px] w-[50px] cursor-pointer  '>
                      <AvatarImage
                        src='https://github.com/shadcn.png'
                        alt='@shadcn'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='end'
                    className='w-30 rounded-xl dark:bg-zinc-950 '
                  >
                    <DropdownMenuItem className=' rounded-md font-medium dark:hover:bg-zinc-950'>
                      Upload
                    </DropdownMenuItem>

                    <DropdownMenuItem className=' rounded-md font-medium text-red-600 dark:hover:bg-zinc-950'>
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='mt-2 flex flex-col'>
                <Label className='text-sm font-semibold'>Name</Label>
                <Input className='mt-1 w-full ' placeholder='Enter your name' />
              </div>
              <div className='mt-2 flex flex-col'>
                <Label className='text-sm font-semibold'>Bio</Label>
                <Input className='mt-1 w-full ' placeholder='Enter your bio' />
              </div>
            </div>
            <DialogFooter>
              <Button className='mt-1 w-full' type='submit'>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
