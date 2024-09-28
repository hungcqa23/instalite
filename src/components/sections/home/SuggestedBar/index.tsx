import { List } from '@/components/ui';
import { http } from '@/lib/http';
import { User } from '@/types/schema-validations/account.schema';
import { cookies } from 'next/headers';

import CurrentProfileSuggest from './current-profile-suggest';
import SuggestedFriend from './suggested-friend';

const SuggestedBar = async () => {
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
};

export { SuggestedBar };
