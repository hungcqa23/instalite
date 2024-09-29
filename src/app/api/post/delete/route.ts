import { http } from '@/lib/http';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { liteId } = await request.json();
    console.log(liteId);
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token');
    const refreshToken = cookieStore.get('refresh_token');

    const res = await http.delete(`posts/${liteId}`, {
      headers: {
        Cookie: accessToken
          ? `access_token=${accessToken?.value}; refresh_token=${refreshToken?.value}`
          : ''
      }
    });

    return NextResponse.json({ message: 'Delete post successfully' });
  } catch (error: any) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { message: 'Failed to delete post', error: error.message },
      { status: 500 }
    );
  }
}
