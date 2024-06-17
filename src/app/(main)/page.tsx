import ListPost from '@/app/(main)/ui/list-post';
import SuggestedBar from '@/app/(main)/ui/SuggestedBar';

import CreateLiteDialog from '@/components/ui/create-lite-dialog';
import IconProfile from '@/components/ui/icon-profile';
import UserAvatar from '@/components/ui/user-avatar';

export default function Home() {
  return (
    <>
      {/* Main concept list xl:mr-[calc((100%-30rem)/2-16rem)] */}
      <div className='mb-2 flex w-full justify-center xl:justify-normal'>
        <div className='mt-2 flex w-full max-w-[35rem] flex-col justify-start xl:ml-[calc((100%-30rem)/2)] xl:mr-20'>
          <div className='mb-4 hidden h-12 w-[30rem] items-start justify-between border-b border-gray-200 py-2 sm:flex xl:flex xl:flex-row'>
            <CreateLiteDialog>
              <div className='flex w-[25rem] cursor-text items-center gap-2'>
                <UserAvatar />
                <p className='ms-2 cursor-text text-sm font-light text-gray-400'>
                  What&apos;s on your mind?
                </p>
              </div>
            </CreateLiteDialog>
            <CreateLiteDialog>
              <div className='flex h-7 w-14 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-white'>
                Post
              </div>
            </CreateLiteDialog>
          </div>

          <div className='flex '>
            <ListPost />
          </div>
        </div>

        <SuggestedBar />
      </div>
    </>
  );
}
