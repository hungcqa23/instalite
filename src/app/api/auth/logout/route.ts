import { http } from '@/lib/http';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');

  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: 'Token not found'
      },
      {
        status: 200
      }
    );
  }

  const res = await http.post('/auth/logout', null, {
    headers: {
      Cookie: `access_token=${accessToken.value}; refresh_token=${refreshToken.value}`
    }
  });

  return Response.json({
    message: 'Logged out successfully'
  });
}
