import { Lite } from '@/types/lite.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Repeat2, Send, Bookmark } from 'lucide-react';

export default function LiteItem({ lite }: { lite: Lite }) {
  return (
    <div className='flex h-[180px] w-[29.25rem] flex-col bg-red-200 px-1.5 '>
      <div className=' my-3 flex flex-row justify-between '>
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
        <Button variant={'link'} className='me-1 px-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <circle cx='12' cy='12' r='1' />
            <circle cx='19' cy='12' r='1' />
            <circle cx='5' cy='12' r='1' />
          </svg>
        </Button>
      </div>
      <div className='mb-3 text-[13px]'>{lite.content}</div>
      <div className='flex flex-row'>
        <div className='flex flex-row gap-2'>
          <Heart className='h-5 w-5 ' />
          <MessageCircle className='h-5 w-5' />
          <Repeat2 className='h-5 w-5' />
          <Send className='h-5 w-5' />
        </div>
      </div>
    </div>
  );
}
