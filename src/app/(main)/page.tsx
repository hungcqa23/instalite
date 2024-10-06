import { CreateLiteDialog } from '@/components/sections/home/CreatedLiteDialog';
import { SuggestedBar } from '@/components/sections/home/SuggestedBar';
import { CurrentUserAvatar } from '@/components/sections/home/current-user-avatar';
import ListPost from '@/components/sections/home/list-posts';

export default function Home() {
  return (
    <>
      {/* Main concept list xl:mr-[calc((100%-30rem)/2-16rem)] */}
      <div className='mb-2 flex w-full justify-center xl:justify-normal'>
        <div className='mt-2 flex w-full max-w-[35rem] flex-col justify-start xl:ml-[calc((100%-30rem)/2)] xl:mr-20'>
          {/* <div className='mb-4 hidden h-12 w-[30rem] items-start justify-between border-b border-gray-200 py-2 sm:flex xl:flex xl:flex-row'>
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
          </div> */}

          <ListPost />
        </div>

        <SuggestedBar />
      </div>
    </>
  );
}
