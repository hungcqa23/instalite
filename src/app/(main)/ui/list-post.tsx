'use client';

import DetailedPostPage from '@/app/(main)/ui/detailed-post';
import List from '@/components/ui/list';
import { Post } from '@/schema-validations/post.schema';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

export default function ListPost() {
  const accessToken = getCookie('access_key');

  const { data } = useQuery({
    queryKey: ['posts', accessToken],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/posts', {
        method: 'GET',
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
      });

      const data = await res.json();
      return data;
    }
  });

  if (!data) return null;
  console.log(data.result);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        {data.result &&
          List<Post>({
            listItems: data.result,
            mapFn: (post: Post) => (
              <DetailedPostPage post={post} key={post._id} />
            ),
            className: 'w-full'
          })}
      </div>
    </div>
  );
}
