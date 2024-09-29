'use client';

import LiteItem from '@/components/ui/lite';
import { Post } from '@/types/schema-validations/post.schema';

export default function DetailedPostPage({ post }: { post: Post }) {
  return (
    <div className='mb-2 flex w-full justify-center xl:justify-normal'>
      <div className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'>
        <div className='flex flex-col items-center'>
          <LiteItem lite={post} isLink />
        </div>
      </div>
    </div>
  );
}
