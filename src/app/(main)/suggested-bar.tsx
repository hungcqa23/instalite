import IconProfile from '@/components/ui/icon-profile';
import Link from 'next/link';

export default function SuggestedBar() {
  return (
    <div className='hidden w-80 flex-col xl:flex'>
      <div className='mt-9 flex flex-col gap-6'>
        {/* Profile */}
        <div className='flex items-center gap-2 px-4'>
          <IconProfile className='h-10 w-10' />

          <div className='flex flex-col'>
            <Link href={`/`} className='text-sm font-semibold'>
              An Hưng
            </Link>
            <p className='text-sm font-normal leading-4 text-gray-500'>
              Cao Quảng An Hưng
            </p>
          </div>
        </div>

        {/* <SuggestedList /> */}
        <div>
          <div className='px-4 py-1'>
            <span className='text-sm font-semibold text-gray-500'>
              Suggested for you
            </span>
          </div>

          {/* {!isLoading &&
            List<User>({
              listItems: recommendationData?.data.users || [],
              mapFn: (user: User) => (
                <SuggestedFriend key={user._id} user={user} />
              )
            })} */}
        </div>
      </div>
    </div>
  );
}
