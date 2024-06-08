import { http } from '@/lib/http';
import { NotificationResType } from '@/schema-validations/notification.schema';

export const notificationRequest = {
  getList: () => http.get<NotificationResType>('/notifications/me')
};
