import Header from '@/components/ui/header';
import List from '@/components/ui/list';
import NotificationItem from '@/components/ui/notification';
import { Notification, NotificationType } from '@/types/notification.type';

export default function NotificationPage() {
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
  return (
    <main className='mt-16 flex h-screen w-screen flex-col items-center justify-start overflow-hidden'>
      <Header activeTab='notification' />
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
    </main>
  );
}
