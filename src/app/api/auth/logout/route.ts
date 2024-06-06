import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const res = await request.json();
  const cookieStore = cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');

  return Response.json({
    message: 'Logged out successfully'
  });
}
