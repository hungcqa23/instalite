'use client';

import {
  Home,
  Search,
  SquarePen,
  Bell,
  UserRound,
  MessageCircleHeartIcon,
  AlignRightIcon,
  Settings,
  Bookmark,
  LogOut
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
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
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(
    theme === 'dark' ? '/orbit-light.svg' : '/orbit.svg'
  );

  return (
    <header className=' fixed top-0 flex h-16 w-full items-center justify-center lg:gap-52'>
      <Link
        href={'/'}
        className='hidden shrink-0 transition-transform duration-200 hover:scale-110 md:flex'
      >
        <Image src={logoSrc} alt='logo' width={30} height={30} />
      </Link>

      <div className='flex md:gap-2'>
        <button className='duration-400 flex h-16 w-24 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-gray-200 hover:text-black'>
          <Home className='h-7 w-7 ' />
        </button>
        <button className='duration-400 flex h-16 w-24 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-gray-200 hover:text-black'>
          <Search className='h-7 w-7 ' />
        </button>
        <button className='duration-400 flex h-16 w-24 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-gray-200 hover:text-black'>
          <SquarePen className='h-7 w-7 ' />
        </button>
        <button className='duration-400 flex h-16 w-24 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-gray-200 hover:text-black'>
          <Bell className='h-7 w-7 ' />
        </button>
        <button className='duration-400 flex h-16 w-24 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-gray-200 hover:text-black'>
          <UserRound className='h-7 w-7 ' />
        </button>
        {/* <button className='duration-400 flex h-16 w-24 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-gray-200 hover:text-black'>
          <MessageCircleHeartIcon className='h-7 w-7 ' />
        </button> */}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='duration-400 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:text-black focus:outline-none dark:hover:text-zinc-50'>
            <AlignRightIcon className='h-7 w-7' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='border- z-20 flex w-60 flex-col gap-1 rounded-lg bg-white px-2 py-3 shadow-default dark:bg-black '>
          <DropdownMenuItem className='rounded-md'>
            <button className='flex h-6 w-56 items-center gap-2 pl-2 text-base font-medium '>
              <Settings size={22} /> Setting
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='rounded-md'>
              <button className='flex h-6 w-56 items-center gap-2 rounded-md pl-2 text-base font-medium  '>
                <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                Set Appearance
              </button>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className=' dark:bg-black'>
                <DropdownMenuItem
                  className='rounded-md'
                  onClick={() => {
                    setTheme('light');
                    setLogoSrc('/orbit.svg');
                  }}
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='rounded-md'
                  onClick={() => {
                    setTheme('dark');
                    setLogoSrc('/orbit-light.svg');
                  }}
                >
                  Dark
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='rounded-md'>
            <button className='flex h-6 w-56 items-center gap-2 rounded-md pl-2 text-base font-medium '>
              <Bookmark size={22} /> Saved
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='rounded-md'>
            <button className='flex h-6 w-56 items-center gap-2 rounded-md pl-2 text-base font-medium '>
              <LogOut size={22} /> Log out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
