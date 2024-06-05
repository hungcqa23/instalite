import { Button } from '@/components/ui/button';
import Link from 'next/link';

function NotFound() {
  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center self-center text-center'>
      <div className='w-96'>
        <h1 className='text-xl font-bold'>This page could not be found :(</h1>
        <p className='mt-2 text-sm font-medium'>
          The link you followed may be broken or the page may have been removed.
        </p>
        <Button className='mt-2 rounded-2xl'>
          <Link href='/'>Go back home</Link>
        </Button>
      </div>
    </main>
  );
}

export default NotFound;
