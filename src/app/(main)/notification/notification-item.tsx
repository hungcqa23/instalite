import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NotificationType } from '@/constants/enum';
import { Notification } from '@/schema-validations/notification.schema';
import Image from 'next/image';
import Link from 'next/link';

export default function NotificationItem({
  notification
}: {
  notification: Notification;
}) {
  let src = '';
  let href: string = '';
  console.log(notification);

  switch (notification.type) {
    case NotificationType.Like:
      src = '/like.svg';

      break;
    case NotificationType.Follow:
      src = '/follow.svg';
      notification.content = `${notification.user_id.username} started following you`;
      href = `${notification.user_id.username}`;
      break;
    default:
      href = '/';
      break;
  }

  return (
    <Link
      href={`username/${href}`}
      className='flex h-fit w-full max-w-full flex-col items-start justify-center border-b-[1px] border-gray-300 py-2 dark:border-gray-800'
    >
      <div className='flex w-full max-w-full flex-row gap-3'>
        <div className='relative z-[-1] ms-1 block'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={
                notification?.user_id?.avatar ??
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt='@shadcn'
            />
          </Avatar>
          <Image
            src={src}
            alt='type'
            className='absolute right-0 top-5 rounded-full bg-zinc-50 ring-1 ring-zinc-50 dark:ring-zinc-950'
            width={15}
            height={15}
          />
        </div>
        <div className='flex w-[21.875rem] flex-col'>
          <div className='flex flex-row items-end gap-1.5'>
            <span className='text-[0.8125rem] font-bold'>
              {notification.user_id.username}
            </span>
            <p className='text-xs font-normal text-gray-500'>1 minutes</p>
          </div>
          <p className='mt-0 w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-950 dark:text-gray-200'>
            {notification.content}
          </p>
          {/* {notification.liteContent ? (
            <p className='mt-0 w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-600'>
              {notification.liteContent}
            </p>
          ) : (
            <div></div>
          )} */}
        </div>
        {/* {notification.type === NotificationType.Follow ? (
          <div className='flex flex-col justify-center'>
            <Button
              className='h-8 rounded-lg px-7 text-sm hover:bg-transparent dark:bg-zinc-950 dark:hover:bg-zinc-950'
              variant={'outline'}
            >
              Follow
            </Button>
          </div>
        ) : (
          <div></div>
        )} */}
      </div>
    </Link>
  );
}
