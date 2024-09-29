import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { User } from '@/types/schema-validations/account.schema';
import Link from 'next/link';

const UserItem = ({ user }: { user: User }) => {
  user.fullName = user.fullName || 'Instalite User';
  user.avatar =
    user.avatar ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <Link
      href={`/username/${user.username}`}
      className='flex h-fit w-full max-w-full flex-col items-start justify-center border-b-[1px] border-gray-300 py-3 dark:border-gray-800'
    >
      <div className='flex w-full max-w-full flex-row gap-3'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={user.avatar} alt='User avatar' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex w-[21.875rem] flex-col'>
          <span className='text-sm font-semibold'>{user.username}</span>
          <div className='text-xs font-normal text-gray-500'>{user.fullName}</div>
        </div>
      </div>
    </Link>
  );
};
export { UserItem };
