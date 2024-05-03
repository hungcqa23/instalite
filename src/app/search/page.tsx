import Header from '@/components/ui/header';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchPage() {
  return (
    <main className='mt-16 flex h-screen w-screen flex-col items-center justify-start overflow-scroll'>
      <Header activeTab='search' />
      <div className='mt-3 h-[500px] w-[32rem] items-start justify-center  '>
        <div className='flex flex-row items-center justify-center rounded-3xl border-2 border-gray-300 px-4 py-2'>
          <Search className=' text-gray-400' />
          <Input
            placeholder='Search for user'
            className='border-none focus-visible:ring-0'
          />
        </div>
      </div>
    </main>
  );
}
