'use client';

import {
  Home,
  Search,
  SquarePen,
  Bell,
  UserRound,
  AlignRightIcon,
  Settings,
  Bookmark
} from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import CreateLiteDialog from '@/components/ui/create-lite-dialog';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import ButtonLogout from '@/app/(main)/ui/button-logout';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const activeTab = pathname.split('/')[1] || '';

  return (
    <header className='h-17 sticky top-0 z-10 flex w-full items-center justify-center gap-2 overflow-y-auto bg-white py-1 dark:bg-zinc-950 lg:gap-52'>
      <Link
        href={'/'}
        className='hidden shrink-0 transition-transform duration-200 hover:scale-110 md:flex'
      >
        <Image src={'/orbit.svg'} alt='logo' width={30} height={30} />
      </Link>

      <div className='flex md:gap-2'>
        <Link href='/'>
          <Button
            className={`${clsx(
              'duration-400 flex h-16 w-24 items-center justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 hover:text-black dark:bg-zinc-950  dark:hover:bg-gray-700/40 dark:hover:text-white',
              {
                'text-black dark:text-zinc-50': activeTab === '',
                'text-zinc-400 dark:text-zinc-700': activeTab !== ''
              }
            )}`}
          >
            <Home className='h-7 w-7 ' />
          </Button>
        </Link>
        <Link href='/search'>
          <Button
            className={`${clsx(
              'duration-400 flex h-16 w-24 items-center justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 hover:text-black dark:bg-zinc-950 dark:hover:bg-gray-700/40 dark:hover:text-white',
              {
                'text-black dark:text-zinc-50': activeTab === 'search',
                'text-zinc-400 dark:text-zinc-700': activeTab !== 'search'
              }
            )}`}
          >
            <Search className='h-7 w-7 ' />
          </Button>
        </Link>
        <CreateLiteDialog>
          <div
            className={`${clsx(
              'duration-400 flex h-16 w-24 items-center justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 hover:text-black dark:bg-zinc-950 dark:hover:bg-gray-700/40 dark:hover:text-white',
              {
                'text-black dark:text-zinc-50': activeTab === 'lite',
                'text-zinc-400 dark:text-zinc-700': activeTab !== 'lite'
              }
            )}`}
          >
            <SquarePen className='h-7 w-7 ' />
          </div>
        </CreateLiteDialog>
        <Link href='/notification'>
          <Button
            className={`${clsx(
              'duration-400 flex h-16 w-24 items-center  justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 hover:text-black dark:bg-zinc-950 dark:hover:bg-gray-700/40 dark:hover:text-white',
              {
                'text-black dark:text-zinc-50': activeTab === 'notification',
                'text-zinc-400 dark:text-zinc-700': activeTab !== 'notification'
              }
            )}`}
          >
            <Bell className='h-7 w-7 ' />
          </Button>
        </Link>
        <Link href='/me'>
          <Button
            className={`${clsx(
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
        {/* <button className='duration-400 flex h-16 w-24 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-gray-200 hover:text-black'>
          <MessageCircleHeartIcon className='h-7 w-7 ' />
        </button> */}
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className='duration-400 flex h-16 w-16 items-center justify-center bg-white text-zinc-400 transition-colors hover:bg-white hover:text-zinc-950 dark:bg-zinc-950 dark:text-zinc-700 dark:hover:bg-zinc-950 dark:hover:text-white'>
            <AlignRightIcon className='h-7 w-7 ' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className='py-3shadow-default z-20 flex w-60 flex-col gap-1 rounded-lg border  px-2'
          align='end'
        >
          <DropdownMenuItem className='flex h-6 w-56 gap-2 rounded-md py-4 pl-3 text-base font-medium'>
            <Settings size={22} /> Setting
            {/* <Button className='flex h-6 w-56 items-center justify-start gap-2 rounded-md pl-2 text-base font-medium hover:bg-none'>
              <Settings size={22} /> Setting
            </Button> */}
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='flex h-6 w-56 gap-2 rounded-md py-4 pl-3 text-base font-medium'>
              <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ' />
              <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              Set Appearance
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className=' dark:bg-black'>
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
