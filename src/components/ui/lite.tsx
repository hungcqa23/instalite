import { Lite } from '@/types/lite.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LucideExternalLink } from 'lucide-react';

export default function LiteItem({ lite }: { lite: Lite }) {
  return (
    <div className='flex h-[180px] w-[29.25rem] flex-col bg-red-200'>
      <div className='mx-1.5 my-3 flex flex-row items-end bg-yellow-200'>
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
        <Button variant={'link'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className='lucide lucide-ellipsis'
          >
            <circle cx='12' cy='12' r='1' />
            <circle cx='19' cy='12' r='1' />
            <circle cx='5' cy='12' r='1' />
          </svg>
        </Button>
      </div>
    </div>
  );
}
