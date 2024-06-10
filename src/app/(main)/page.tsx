import ListPost from '@/app/(main)/ui/list-post';
import SuggestedBar from '@/app/(main)/ui/SuggestedBar';
import CreateLiteDialog from '@/components/ui/create-lite-dialog';
import IconProfile from '@/components/ui/icon-profile';

export default function Home() {
  return (
    <>
      {/* Main concept list xl:mr-[calc((100%-30rem)/2-16rem)] */}
      <div className='mb-2 flex w-full justify-center xl:justify-normal'>
        <div className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'>
          <div className='mb-4 hidden h-12 w-full items-center justify-between border-b border-gray-200 py-2 sm:flex'>
            <CreateLiteDialog>
              <div className='flex w-96 cursor-text items-center gap-2 '>
                <IconProfile />
                <p className='ms-2  cursor-text text-sm font-light text-gray-400'>
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

          <div className='flex flex-col items-center'>
            {/* {Array.from({ length: 20 }).map((_, index) => (
              <LiteItem lite={testLite} key={index} />
            ))} */}
            <ListPost />
          </div>
        </div>

        <SuggestedBar />
      </div>
    </>
  );
}
