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
export default function Header() {
  return (
    <header className='flex h-16 w-full items-center justify-center gap-28 bg-gray-50'>
      <Image src='/orbit.svg' alt='logo' width={46} height={46} />
      <div className='flex gap-2'>
        <button className='flex h-16 w-24 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200'>
          <Home className='h-7 w-7 text-zinc-400' />
        </button>
        <button className='flex h-16 w-24 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200'>
          <Search className='h-7 w-7 text-zinc-400' />
        </button>
        <button className='flex h-16 w-24 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200'>
          <SquarePen className='h-7 w-7 text-zinc-400' />
        </button>
        <button className='flex h-16 w-24 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200'>
          <Bell className='h-7 w-7 text-zinc-400' />
        </button>
        <button className='flex h-16 w-24 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200'>
          <UserRound className='h-7 w-7 text-zinc-400' />
        </button>
        <button className='flex h-16 w-24 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200'>
          <MessageCircleHeartIcon className='h-7 w-7 text-zinc-400' />
        </button>
      </div>
      <button className='duration-400 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:text-black'>
        <AlignRightIcon className='h-8 w-8' />
      </button>
    </header>
  );
}
