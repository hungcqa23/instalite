'use client';

import { ButtonLogout } from '@/components/sections/home/button-logout';
import { CreateLiteDialog } from '@/components/sections/home/create-lite-dialog';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/stores/user.stores';
import { Notification } from '@/types/schema-validations/notification.schema';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { AlignRightIcon, Bell, Bookmark, Home, Search, SquarePen, UserRound } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const { user } = useUserStore();
  const pathname = usePathname();
  const activeTab = pathname.split('/')[1] || '';
  const [svgSrc, setSvgSrc] = useState('/orbit.svg');
  const [newNoti, setNewNoti] = useState(false);
  const accessToken = getCookie('access_key');

  useEffect(() => {
    setSvgSrc(resolvedTheme === 'dark' ? '/orbit-light.svg' : '/orbit.svg');
  }, [resolvedTheme]);

  const { data } = useQuery({
    queryKey: ['notification', accessToken],
    queryFn: () =>
      fetch('http://localhost:8000/notifications/me', {
        method: 'GET',
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
      }).then(res => res.json())
  });
  const newNotification =
    data?.result?.some((notification: Notification) => notification.checked === false) || false;

  useEffect(() => {
    if (newNotification) {
      setNewNoti(true);
    }
  }, [newNotification]);

  return (
    <header className='h-17 sticky top-0 z-10 flex w-full items-center justify-center gap-2 overflow-y-auto overflow-x-hidden bg-white py-1 dark:bg-zinc-950 lg:gap-52'>
      <Link
        href={'/'}
        className='hidden shrink-0 transition-transform duration-200 hover:scale-110 md:flex'
      >
        <Image src={svgSrc} alt='logo' width={30} height={30} />
      </Link>

      <div className='flex md:gap-2'>
        <Link href='/'>
          <Button
            className={`${cn(
              'duration-400 flex h-16 w-24 items-center justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 hover:text-black dark:bg-zinc-950 dark:hover:bg-gray-700/40 dark:hover:text-white',
              {
                'text-black dark:text-zinc-50': activeTab === '',
                'text-zinc-400 dark:text-zinc-700': activeTab !== ''
              }
            )}`}
          >
            <Home className='h-7 w-7' />
          </Button>
        </Link>
        <Link href='/search'>
          <Button
            className={`${cn(
              'duration-400 flex h-16 w-24 items-center justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 hover:text-black dark:bg-zinc-950 dark:hover:bg-gray-700/40 dark:hover:text-white',
              {
                'text-black dark:text-zinc-50': activeTab === 'search',
                'text-zinc-400 dark:text-zinc-700': activeTab !== 'search'
              }
            )}`}
          >
            <Search className='h-7 w-7' />
          </Button>
        </Link>
        <CreateLiteDialog>
          <div
            className={`${cn(
              'duration-400 flex h-16 w-24 items-center justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 hover:text-black dark:bg-zinc-950 dark:hover:bg-gray-700/40 dark:hover:text-white',
              {
                'text-black dark:text-zinc-50': activeTab === 'lite',
                'text-zinc-400 dark:text-zinc-700': activeTab !== 'lite'
              }
            )}`}
          >
            <SquarePen className='h-7 w-7' />
          </div>
        </CreateLiteDialog>
        <Link href='/notification'>
          <Button
            className={`${cn(
              'duration-400 flex h-16 w-24 items-center justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 hover:text-black dark:bg-zinc-950 dark:hover:bg-gray-700/40 dark:hover:text-white',
              {
                'text-black dark:text-zinc-50': activeTab === 'notification',
                'text-zinc-400 dark:text-zinc-700': activeTab !== 'notification'
              }
            )}`}
            onClick={() => setNewNoti(false)}
          >
            <div className='relative'>
              <Bell className='relative h-7 w-7' />

              {newNoti && (
                <span className='absolute right-0 top-0 inline-flex h-2 w-2 animate-ping rounded-full bg-red-500 opacity-100' />
              )}
            </div>
          </Button>
        </Link>

        <Link href={`/username/${user?.username}`}>
          <Button
            className={`${cn(
              'duration-400 flex h-16 w-24 items-center justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 hover:text-black dark:bg-zinc-950 dark:hover:bg-gray-700/40 dark:hover:text-white',
              {
                'text-black dark:text-zinc-50': activeTab === 'me',
                'text-zinc-400 dark:text-zinc-700': activeTab !== 'me'
              }
            )}`}
          >
            <UserRound className='h-7 w-7' />
          </Button>
        </Link>
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className='duration-400 flex h-16 w-16 items-center justify-center bg-white text-zinc-400 transition-colors hover:bg-white hover:text-zinc-950 dark:bg-zinc-950 dark:text-zinc-700 dark:hover:bg-zinc-950 dark:hover:text-white'>
            <AlignRightIcon className='h-7 w-7' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className='py-3shadow-default z-20 flex w-60 flex-col gap-1 rounded-lg border px-2'
          align='end'
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='flex h-6 w-56 gap-2 rounded-md py-4 pl-3 text-base font-medium'>
              <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              Set Appearance
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className='dark:bg-black'>
                <DropdownMenuItem
                  className='rounded-md text-base font-medium'
                  onClick={() => {
                    setTheme('light');
                  }}
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='rounded-md text-base font-medium'
                  onClick={() => {
                    setTheme('dark');
                  }}
                >
                  Dark
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />

          <Link href='/me/saved'>
            <DropdownMenuItem className='flex h-6 w-56 gap-2 rounded-md py-4 pl-3 text-base font-medium'>
              <Bookmark size={22} /> Saved
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
          <ButtonLogout />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
