'use client';

import { List } from '@/components/ui';
import LiteItem from '@/components/ui/lite';
import { useGetAllPostsQuery } from '@/hooks/queries/usePost';
import { Post } from '@/types/schema-validations/post.schema';

const ListPost = () => {
  const { data, isLoading } = useGetAllPostsQuery();
  const posts = data?.data;

  return (
    <div className='-ms-10 h-full w-full'>
      {posts &&
        posts.length > 0 &&
        List<Post>({
          listItems: posts,
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

export default ListPost;
