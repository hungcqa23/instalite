'use client';
import { Lite } from '@/types/lite.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  Bookmark,
  Trash,
  Pencil,
  Sparkle,
  MessageSquareQuote
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { formatSocialNumber } from '@/lib/utils';

export default function LiteItem({ lite }: { lite: Lite }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className='mb-2 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5'>
      <div className='mb-2 flex flex-row items-center justify-between'>
        <div className='flex flex-row items-end'>
          <Avatar className='z-[-1] h-9 w-9'>
            <AvatarImage src={lite.avatar} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='ms-2.5 flex flex-col justify-end '>
            <span className='text-[13px] font-semibold'>{lite.username}</span>
            <span className='text-xs font-normal text-gray-500'>
              {lite.createdAt}
            </span>
          </div>
        </div>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={'link'} className='me-1 h-5 w-5 px-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-ellipsis'
              >
                <circle cx='12' cy='12' r='1' />
                <circle cx='19' cy='12' r='1' />
                <circle cx='5' cy='12' r='1' />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='-ms-3 w-56 rounded-lg py-2 shadow-default dark:bg-zinc-950'
          >
            <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
              <Trash className='mb-0 h-4 w-4' />
              <span className=''>Delete lite</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
              <Pencil className='mb-0 h-4 w-4' />
              <span className=''>Edit lite</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
              <Sparkle className='mb-0 h-4 w-4' />
              <span className=''>Summarize with Relite AI</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className='text-[0.8125rem]'>{lite.content}</p>
      {lite.url && (
        <div className='my-3'>
          <Image
            src={lite.url}
            alt='image'
            width={430}
            height={430}
            className=' rounded-md'
          />
        </div>
      )}
      <div className='mt-1 flex flex-row justify-between'>
        <div className='ms-0.5 flex flex-row gap-3'>
          <button
            onClick={() => {
              console.log('Hello World!');
              console.log(liked);
              setLiked(prev => !liked);
            }}
          >
            <Heart
              className={`${clsx(
                'h-5 w-5 cursor-pointer transition-colors duration-300',
                {
                  'fill-red-500 stroke-red-500': liked,
                  'fill-white stroke-black': !liked
                }
              )}`}
            />
          </button>

          <MessageCircle className='h-5 w-5 cursor-pointer' />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Repeat2 className='h-5 w-5 cursor-pointer' />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align='start'
              className='w-30 rounded-lg shadow-default dark:bg-zinc-950'
            >
              <DropdownMenuItem className=' gap-2 rounded-md font-medium dark:hover:bg-zinc-950'>
                <Repeat2 className='mb-0 h-4 w-4' />
                <div className='mt-0.5'>Relite</div>
              </DropdownMenuItem>

              <DropdownMenuItem className=' gap-2 rounded-md font-medium dark:hover:bg-zinc-950'>
                <MessageSquareQuote className='mb-0 h-4 w-4' />
                <div className='mt-0.5'>Quote</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Send className='h-5 w-5 cursor-pointer' />
        </div>

        <button onClick={() => setBookmarked(prev => !bookmarked)}>
          <Bookmark
            className={`${clsx(
              'h-5 w-5 cursor-pointer transition-colors duration-300',
              {
                'fill-black': bookmarked,
                'fill-white stroke-black': !bookmarked
              }
            )}`}
          />
        </button>
      </div>

      <span className='mt-2 block text-xs font-medium text-black'>
        {formatSocialNumber(lite.likesCount)} likes
      </span>
      <button>
        <span className='text-xs text-slate-500'>
          See all {lite.replysCount} comments
        </span>
      </button>
    </div>
  );
}
