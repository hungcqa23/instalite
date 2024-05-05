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

export default function LiteItem({ lite }: { lite: Lite }) {
  return (
    <div className='flex h-[180px] w-[29.25rem] flex-col  px-1.5 '>
      <div className=' my-3 flex flex-row items-center justify-between'>
        <div className='flex flex-row items-end'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={lite.avatar} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='ms-2.5 flex flex-col justify-end '>
            <span className='text-[13px] font-semibold'>{lite.username}</span>
            <div className='text-xs font-normal text-gray-500'>
              {lite.createdAt}
            </div>
          </div>
        </div>
        <DropdownMenu>
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
            align='start'
            className='-ms-3 w-56 rounded-xl dark:bg-zinc-950'
          >
            <DropdownMenuItem className='ms-1 cursor-pointer gap-2 rounded-md font-medium'>
              <Trash className='mb-0 h-4 w-4' />
              <div className='mt-0.5'>Delete lite</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='ms-1 cursor-pointer gap-2 rounded-md font-medium'>
              <Pencil className='mb-0 h-4 w-4' />
              <div className='mt-0.5'>Edit lite</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='ms-1 cursor-pointer gap-2 rounded-md font-medium'>
              <Sparkle className='mb-0 h-4 w-4' />
              <div className='mt-0.5'>Summarize with Relite AI</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='mb-3 text-[13px]'>{lite.content}</div>
      <div className='flex flex-row justify-between'>
        <div className='ms-0.5 flex flex-row gap-3'>
          <Heart className='h-5 w-5 cursor-pointer' />
          <MessageCircle className='h-5 w-5 cursor-pointer' />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Repeat2 className='h-5 w-5 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              className='w-30 rounded-xl dark:bg-zinc-950 '
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
        <Bookmark className='me-1.5 h-5 w-5 cursor-pointer' />
      </div>
      <div className='mt-1 flex flex-row gap-1 text-xs font-light'>
        <div>{lite.replysCount} replied lites </div>
        <div>·</div>
        <div>{lite.likesCount} likes</div>
      </div>
    </div>
  );
}
