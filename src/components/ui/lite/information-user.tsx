import { AvatarUser } from '@/components/ui';
import { calculateTimeAgo } from '@/lib/helper';
import { Post } from '@/types/schema-validations/post.schema';
import Link from 'next/link';

export default function InformationUser({ lite }: { lite: Post }) {
  return (
    <div className='flex flex-row items-end'>
      <AvatarUser
        className='z-[-1] size-9'
        src={lite?.userId?.avatar}
        alt={lite?.userId?.username}
      />
      <div className='ms-2.5 flex flex-col justify-end'>
        <Link href={`/username/${lite?.userId?.username}`}>
          <span className='text-[13px] font-semibold'>{lite?.userId?.username}</span>
        </Link>
        <span className='text-xs font-normal text-gray-500'>
          {calculateTimeAgo(lite?.createdAt)}
        </span>
      </div>
    </div>
  );
}
