'use client';

import { List } from '@/components/ui';
import LiteItem from '@/components/ui/lite';
import { Post } from '@/types/schema-validations/post.schema';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const ListPost = () => {
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
  return (
    <div className='-ms-10 h-full w-full'>
      {data.result &&
        List<Post>({
          listItems: data.result,
          mapFn: (post: Post) => (
            <div className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'>
              <div className='flex flex-col items-center'>
                <LiteItem key={post._id} lite={post} isLink />
              </div>
            </div>
          ),
          className: 'w-full xl:block flex flex-col items-center'
        })}
    </div>
  );
};

export { ListPost };
