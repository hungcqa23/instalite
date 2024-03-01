import IconProfile from '@/components/ui/icon-profile';
import SuggestedBar from './main/suggested-bar';

export default function Home() {
  return (
    <main className='mt-16 h-screen w-screen overflow-y-auto bg-gray-100'>
      <div className='flex justify-center  xl:justify-end'>
        <div className='w-full max-w-[30rem] bg-gray-50 xl:mr-[calc((100%-30rem)/2-16rem)] '>
          <div className='flex w-full items-center border-b-2 border-gray-200 pb-2'>
            <IconProfile />
          </div>
        </div>

        <SuggestedBar />
      </div>
    </main>
  );
}
