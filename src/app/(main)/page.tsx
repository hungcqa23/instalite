import SuggestedBar from '@/app/(main)/ui/suggested-bar';
import CreateLiteDialog from '@/components/ui/create-lite-dialog';
import IconProfile from '@/components/ui/icon-profile';
import LiteItem from '@/components/ui/lite-item';
import { Lite } from '@/types/lite.type';

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
const testLite1: Lite = {
  avatar:
    'https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/446592648_1922152721578822_1948576158759031871_n.jpg?stp=dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDI1NjAuaGRyLmYyOTM1MCJ9&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=07VHeFcx0lgQ7kNvgGK-VQT&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzM4MDI0Njg4ODUzNDkwODU4OQ%3D%3D.2-ccb7-5&oh=00_AYA_70zWxvwXP9Jhbvj5o0T2kP0HcSpHJBOEe-denvOc0g&oe=665EDC89&_nc_sid=10d13b',
  content:
    'Aenean vitae porttitor magna, non venenatis tortor. In hac habitasse platea dictumst. Morbi sagittis, ante et condimentum malesuada, lectus arcu faucibus urna, eget eleifend ipsum metus et ligula.',
  createdAt: 'a hour ago',
  likesCount: 1067,
  replysCount: 2,
  username: 'anhung_dep_try',
  url: 'https://images.unsplash.com/photo-1717201410616-205a82d7e3f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
};
export default function Home() {
  return (
    <>
      {/* Main concept list xl:mr-[calc((100%-30rem)/2-16rem)] */}
      <div className='mb-2 flex w-full justify-center xl:justify-normal'>
        <div className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'>
          <div className='mb-4 hidden h-12 w-full items-center justify-between border-b border-gray-200 py-2 sm:flex'>
            <CreateLiteDialog>
              <div className='flex w-96 cursor-text items-center gap-2 '>
                <IconProfile />
                <p className='ms-2  cursor-text text-sm font-light text-gray-400'>
                  What&apos;s on your mind?
                </p>
              </div>
            </CreateLiteDialog>
            <CreateLiteDialog>
              <div className='flex h-7 w-14 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-white'>
                Post
              </div>
            </CreateLiteDialog>
          </div>

          <div className='flex flex-col items-center'>
            {/* {Array.from({ length: 20 }).map((_, index) => (
              <LiteItem lite={testLite} key={index} />
            ))} */}
          </div>
        </div>

        <SuggestedBar />
      </div>
    </>
  );
}
