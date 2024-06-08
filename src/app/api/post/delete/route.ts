import { http } from '@/lib/http';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { liteId } = await request.json();
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');

  await http.delete(`posts/${liteId}`, {
    headers: {
      Cookie: accessToken
        ? `access_token=${accessToken?.value}; refresh_token=${refreshToken?.value}`
        : ''
    }
  });
  return Response.json({
    message: 'Delete post successfully'
  });
}
