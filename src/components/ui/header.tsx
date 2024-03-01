'use client';

import {
  Home,
  Search,
  SquarePen,
  Bell,
  UserRound,
  MessageCircleHeartIcon,
  AlignRightIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Popover from './popover';

export default function Header() {
  return (
    <header className='flex h-16 w-full items-center justify-center gap-32'>
      <Link href={'/'}>
        <Image src='/orbit.svg' alt='logo' width={46} height={46} />
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
          <ul className='shadow-default h-52 w-60 rounded-xl'></ul>
        }
      >
        <button className='duration-400 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:text-black'>
          <AlignRightIcon className='h-8 w-8' />
        </button>
      </Popover>
    </header>
  );
}
