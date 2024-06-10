import { User } from '@/types/user.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Account } from '@/schema-validations/account.schema';
export default function UserItem({ user }: { user: Account }) {
  user.avatar =
    user.avatar ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <Link
      href={`/username/${user.username}`}
      className='flex h-fit w-full max-w-full flex-col items-start justify-center border-b-[1px] border-gray-300  py-3 dark:border-gray-800'
    >
      <div className='flex w-full max-w-full flex-row gap-3'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={user.avatar} alt='User avatar' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex w-[21.875rem] flex-col'>
          <span className='text-sm font-semibold '>{user.username}</span>
          <div className='text-xs font-normal text-gray-500'>
            {user.username}
          </div>
          {/* <div className='mt-1 text-sm font-normal'>
            {user.followersCount} followers
          </div> */}
        </div>
        {/* <div className='flex flex-col justify-center '>
          <Button
            className='mt-1 h-8 rounded-lg px-7 text-sm hover:bg-transparent dark:bg-zinc-950 dark:hover:bg-zinc-950'
            variant={'outline'}
          >
            Follow
          </Button>
        </div> */}
      </div>
    </Link>
  );
}
