import Header from '@/components/ui/header';
import List from '@/components/ui/list';
import NotificationItem from '@/app/(main)/notification/notification-item';
import { Notification, NotificationType } from '@/types/notification.type';

export const metadata = {
  title: 'Notification'
};

const myNotification: Notification[] = [
  {
    liteId: '1',
    message: 'Like your post',
    liteContent:
      'This is post content This is post content This is post content This is post content This is post content ',
    type: NotificationType.Like
  },
  {
    liteId: '2',
    message: 'Son Tung M-TP started following you.',
    type: NotificationType.Follow
  },
  {
    liteId: '3',
    message: 'Your post was relited!',
    liteContent:
      'This is post content This is post content This is post content This is post content This is post content ',
    type: NotificationType.Relite
  },
  {
    liteId: '1',
    message: 'Like your post',
    liteContent:
      'This is post content This is post content This is post content This is post content This is post content ',
    type: NotificationType.Like
  },
  {
    liteId: '2',
    message: 'Son Tung M-TP started following you.',
    type: NotificationType.Follow
  },
  {
    liteId: '3',
    message: 'Your post was relited!',
    liteContent:
      'This is post content This is post content This is post content This is post content This is post content ',
    type: NotificationType.Relite
  },
  {
    liteId: '1',
    message: 'Like your post',
    liteContent:
      'This is post content This is post content This is post content This is post content This is post content ',
    type: NotificationType.Like
  },
  {
    liteId: '2',
    message: 'Son Tung M-TP started following you.',
    type: NotificationType.Follow
  },
  {
    liteId: '3',
    message: 'Your post was relited!',
    liteContent:
      'This is post content This is post content This is post content This is post content This is post content ',
    type: NotificationType.Relite
  }
];
export default function NotificationPage() {
  return (
    <div className='h-fit w-[32rem] items-start justify-center '>
      {List({
        listItems: myNotification,
        mapFn: notification => (
          <NotificationItem
            key={notification.message}
            notification={notification}
          />
        ),
        as: 'ul'
      })}
    </div>
  );
}
