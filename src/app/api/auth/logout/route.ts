import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('access_key');

  return Response.json({
    message: 'Logged out successfully'
  });
}
