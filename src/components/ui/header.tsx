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
  LogOut,
  Sun
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Popover from './popover';
import { Button } from './button';

export default function Header() {
  return (
    <header className='flex h-16 w-full items-center justify-center gap-32'>
      <Link href={'/'}>
        <Image src='/orbit.svg' alt='logo' width={42} height={42} />
      </Link>

      <div className='flex gap-2'>
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
        <button className='duration-400 flex h-16 w-24 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-gray-200 hover:text-black'>
          <MessageCircleHeartIcon className='h-7 w-7 ' />
        </button>
      </div>

      <Popover
        placement='bottom-end'
        renderPopover={
          <nav className='shadow-default flex w-60 flex-col gap-1 rounded-lg px-2 py-3'>
            <button className='flex h-10 w-56 items-center gap-2 rounded-md pl-2 text-base font-medium hover:bg-gray-50'>
              <Settings size={22} /> Setting
            </button>
            <button className='flex h-10 w-56 items-center gap-2 rounded-md pl-2 text-base font-medium hover:bg-gray-50'>
              <Sun /> Switch Appearance
            </button>
            <button className='flex h-10 w-56 items-center gap-2 rounded-md pl-2 text-base font-medium hover:bg-gray-50'>
              <Bookmark size={22} /> Saved
            </button>
            <button className='flex h-10 w-56 items-center gap-2 rounded-md pl-2 text-base font-medium hover:bg-gray-50'>
              <LogOut size={22} /> Log out
            </button>
          </nav>
        }
      >
        <button className='duration-400 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:text-black'>
          <AlignRightIcon className='h-8 w-8' />
        </button>
      </Popover>
    </header>
  );
}
