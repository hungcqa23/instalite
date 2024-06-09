import { http } from '@/lib/http';
import { NotificationResType } from '@/schema-validations/notification.schema';
import { cookies } from 'next/headers';

const cookieStore = cookies();
const accessToken = cookieStore.get('access_token');
const refreshToken = cookieStore.get('refresh_token');

export const notificationRequest = {
  getList: () =>
    http.get('/notifications/me', {
      headers: {
        Cookie: accessToken
          ? `access_token=${accessToken?.value}; refresh_token=${refreshToken?.value}`
          : ''
      }
    })
};
