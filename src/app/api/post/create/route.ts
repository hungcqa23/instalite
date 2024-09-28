import { http } from '@/lib/http';
import { CreatePost, PostType } from '@/types/schema-validations/post.schema';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

function createPost(text: string): CreatePost {
  return {
    content: text,
    typePost: PostType.NewPost
  };
}

export async function POST(request: Request) {
  try {
    const { content }: { content: string } = await request.json();
    console.log(content);
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token');
    const refreshToken = cookieStore.get('refresh_token');

    const res = await http.post(`posts/`, createPost(content), {
      headers: {
        Cookie: accessToken
          ? `access_token=${accessToken?.value}; refresh_token=${refreshToken?.value}`
          : ''
      }
    });
    const { postId }: { postId: string } = res;
    console.log(postId);

    return NextResponse.json({ message: 'Create post successfully' });
  } catch (error: any) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { message: 'Failed to create post', error: error.message },
      { status: 500 }
    );
  }
}
