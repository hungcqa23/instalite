import SuggestedBar from '@/app/(main)/ui/suggested-bar';
import IconProfile from '@/components/ui/icon-profile';
import LiteItem from '@/components/ui/lite-item';
import { Lite } from '@/types/lite.type';

const testLite: Lite = {
  avatar:
    'https://scontent.fsgn24-1.fna.fbcdn.net/v/t39.30808-1/341166095_1287695245513783_5677951521827952093_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFTRxizbOenNB2VWOiV780vZSIHvA1DtEtlIge8DUO0S2UYcbCV2vnLZ7WOaVBj8WmtdGTbsuwfG2Kr9eo01lac&_nc_ohc=nMzMoOMx3AAQ7kNvgFnwmRL&_nc_ht=scontent.fsgn24-1.fna&oh=00_AfDWzyyHgcqEZ8r4dSd8egUT2DcGnWIOMMPJ6FHa7Jpz8A&oe=663D6D7B',
  content:
    'Aenean vitae porttitor magna, non venenatis tortor. In hac habitasse platea dictumst. Morbi sagittis, ante et condimentum malesuada, lectus arcu faucibus urna, eget eleifend ipsum metus et ligula.',
  createdAt: 'a hour ago',
  likesCount: 1600,
  replysCount: 2,
  username: 'anhung_dep_try'
};
const testLite1: Lite = {
  avatar:
    'https://scontent.cdninstagram.com/v/t51.29350-15/442650677_1724665738058698_104126375099075557_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=3V5mbtAs3TsQ7kNvgHRrHr4&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzM2NzgwNjg4ODQzNDQwNDQxMQ%3D%3D.2-ccb7-5&oh=00_AYAIAeQ9NUByRtE46Kw-RgXVcP6nLusw7wn3jjwpH3PjJw&oe=664726B6&_nc_sid=10d13b',
  content:
    'Aenean vitae porttitor magna, non venenatis tortor. In hac habitasse platea dictumst. Morbi sagittis, ante et condimentum malesuada, lectus arcu faucibus urna, eget eleifend ipsum metus et ligula.',
  createdAt: 'a hour ago',
  likesCount: 1067,
  replysCount: 2,
  username: 'anhung_dep_try',
  url: 'https://scontent.cdninstagram.com/v/t51.29350-15/442650677_1724665738058698_104126375099075557_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=3V5mbtAs3TsQ7kNvgHRrHr4&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzM2NzgwNjg4ODQzNDQwNDQxMQ%3D%3D.2-ccb7-5&oh=00_AYAIAeQ9NUByRtE46Kw-RgXVcP6nLusw7wn3jjwpH3PjJw&oe=664726B6&_nc_sid=10d13b'
};
export default function Home() {
  return (
    <>
      {/* Main concept list xl:mr-[calc((100%-30rem)/2-16rem)] */}
      <div className='mb-2 flex w-full justify-center xl:justify-normal'>
        <div className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'>
          <div className='mb-4 hidden h-12 w-full items-center justify-between border-b border-gray-200 py-2 sm:flex'>
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

          <div className='flex flex-col items-center'>
            <LiteItem lite={testLite1} />
            {Array.from({ length: 20 }).map((_, index) => (
              <LiteItem lite={testLite} key={index} />
            ))}
          </div>
        </div>

        <SuggestedBar />
      </div>
    </>
  );
}
