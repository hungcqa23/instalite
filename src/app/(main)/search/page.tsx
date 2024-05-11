import Header from '@/components/ui/header';
import { Input } from '@/components/ui/input';
import List from '@/components/ui/list';
import UserItem from '@/components/ui/user';
import { User } from '@/types/user.type';
import { Search } from 'lucide-react';

const userList: User[] = [
  {
    id: '1',
    avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
    followersCount: 500,
    fullName: 'Faker',
    username: 'faker'
  },
  {
    id: '2',
    avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
    followersCount: 500,
    fullName: 'Faker',
    username: 'faker'
  },
  {
    id: '3',
    avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
    followersCount: 500,
    fullName: 'Faker',
    username: 'faker'
  },
  {
    id: '4',
    avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
    followersCount: 500,
    fullName: 'Faker',
    username: 'faker'
  },
  {
    id: '5',
    avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
    followersCount: 500,
    fullName: 'Faker',
    username: 'faker'
  },
  {
    id: '6',
    avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
    followersCount: 500,
    fullName: 'Faker',
    username: 'faker'
  },
  {
    id: '7',
    avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
    followersCount: 500,
    fullName: 'Faker',
    username: 'faker'
  },
  {
    id: '8',
    avatar: 'https://pbs.twimg.com/media/F_TSzsLaoAAErQe.jpg:large',
    followersCount: 500,
    fullName: 'Faker',
    username: 'faker'
  }
];
export default function SearchPage() {
  return (
    <>
      <Header activeTab='search' />
      <div className='mt-3 h-fit w-[32rem] items-start justify-center  '>
        <div className='mb-2 flex flex-row items-center justify-center rounded-3xl border-2 border-gray-300  px-4 py-2'>
          <Search className=' text-gray-400' />
          <Input
            placeholder='Search for user'
            className='border-none focus-visible:ring-0'
          />
        </div>

        {List({
          listItems: userList,
          mapFn: user => <UserItem key={user.id} user={user} />,
          as: 'ul'
        })}
      </div>
    </>
  );
}
