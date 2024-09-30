import { notificationRequest } from '@/api-request/notification';
import NotificationItem from '@/app/(main)/notification/notification-item';
import { List } from '@/components/ui';
import { Notification, NotificationResType } from '@/types/schema-validations/notification.schema';

export const metadata = {
  title: 'Notification'
};

export default async function NotificationPage() {
  // const { result: notifications } = (await notificationRequest.getList()) as NotificationResType;

  return (
    <div className='h-fit w-[32rem] items-start justify-center'>
      {/* {List<Notification>({
        listItems: notifications,
        mapFn: notification => (
          <NotificationItem key={notification._id} notification={notification} />
        ),
        as: 'ul'
      })} */}
    </div>
  );
}
