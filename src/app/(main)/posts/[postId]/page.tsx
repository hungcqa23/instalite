import LiteItem from '@/components/ui/lite';
import { http } from '@/lib/http';
import { Post, PostResType } from '@/types/schema-validations/post.schema';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Detail post'
};

export default async function DetailPostPage(param: {
  params: { postId: string };
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');

  const res = await http.get<PostResType>(`posts/${param?.params.postId}`, {
    headers: {
      Cookie: accessToken
        ? `access_token=${accessToken?.value}; refresh_token=${refreshToken?.value}`
        : ''
    }
  });

  return (
    <div className='mb-2 flex w-full justify-center xl:justify-normal'>
      <div className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'>
        <div className='flex flex-col items-center'>
          {/* <LiteItem lite={post} /> */}
        </div>
      </div>
    </div>
  );
}
