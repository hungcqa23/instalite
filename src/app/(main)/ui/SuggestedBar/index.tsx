import SuggestedFriend from '@/app/(main)/ui/SuggestedBar/SuggestedFriend';
import CurrentProfileSuggest from '@/app/(main)/ui/SuggestedBar/current-profile-suggest';
import List from '@/components/ui/list';
import { http } from '@/lib/http';
import { User } from '@/schema-validations/account.schema';
import { cookies } from 'next/headers';

export default async function SuggestedBar() {
  const cookieStore = cookies();
  const { users }: { users: User[] } = await http.get(`/users/recommend`, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `access_token=${cookieStore.get('access_token')?.value}; refresh_token=${cookieStore.get('refresh_token')?.value}`
    }
  });

  return (
    <div className='hidden w-80 flex-col xl:flex'>
      <div className='mt-9 flex flex-col gap-6'>
        {/* Profile */}
        <CurrentProfileSuggest />

        {/* <SuggestedList /> */}
        <div>
          <div className='px-4 py-1'>
            <span className='text-sm font-semibold text-gray-500'>
              Suggested for you
            </span>
          </div>

          {List<User>({
            listItems: users,
            mapFn: (user: User) => (
              <SuggestedFriend key={user._id} user={user} />
            )
          })}
        </div>
      </div>
    </div>
  );
}
