import { Lite } from '@/types/lite.type';
import LiteItem from '@/components/ui/lite-item';
import CommentItem from '@/components/ui/comment-item';
import { Comment } from '@/types/comment.type';
export const metadata = {
  title: 'Detail post'
};

const testLite: Lite = {
  avatar:
    'https://scontent.cdninstagram.com/v/t51.29350-15/447077438_978175286926900_4717450693372967518_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=hUv-Cemq_nUQ7kNvgHN17WZ&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzM4MDE5MjkxMTcyNjk0NTQxNw%3D%3D.2-ccb7-5&oh=00_AYDBpLiL2Uw0v8Xxe3fcIyA3NwI1JzlTYsau_NeVAPfD-w&oe=6660E307&_nc_sid=10d13b',
  content:
    'Aenean vitae porttitor magna, non venenatis tortor. In hac habitasse platea dictumst. Morbi sagittis, ante et condimentum malesuada, lectus arcu faucibus urna, eget eleifend ipsum metus et ligula.',
  createdAt: 'a hour ago',
  likesCount: 1600,
  replysCount: 2,
  username: 'anhung_dep_try'
};

const testComment: Comment = {
  avatar: 'https://github.com/shadcn.png',
  content: 'Post này hay quá',
  createdAt: 'a hour ago',
  username: 'anhung_dep_try'
};

export default function DetailPostPage() {
  return (
    <div className='mb-2 flex w-full justify-center xl:justify-normal'>
      <div className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'>
        <div className='flex flex-col items-center'>
          <LiteItem lite={testLite} />
          <CommentItem comment={testComment} />
        </div>
      </div>
    </div>
  );
}
