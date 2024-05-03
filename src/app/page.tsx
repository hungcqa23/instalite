import IconProfile from '@/components/ui/icon-profile';
import SuggestedBar from './(main)/suggested-bar';
import Header from '@/components/ui/header';

export default function Home() {
  return (
    <main className='mt-16 h-screen w-screen overflow-y-auto'>
      <Header activeTab='home' />
      <div className='flex items-start justify-center xl:justify-end'>
        <div className='mt-2 w-full max-w-[30rem] xl:mr-[calc((100%-30rem)/2-16rem)]'>
          <div className='flex h-12 w-full items-center justify-between border-b border-gray-200 py-2'>
            <div className='flex items-center gap-2'>
              <IconProfile />
              <p className='text-sm font-light text-gray-400'>
                Starting with instalite
              </p>
            </div>

            <button className='h-7 w-14 rounded-full bg-gray-300 text-sm font-semibold text-white'>
              Post
            </button>
          </div>
        </div>

        <SuggestedBar />
      </div>
    </main>
  );
}
