import { Lite } from '@/types/lite.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Ellipse } from 'lucide-react';

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
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
}
