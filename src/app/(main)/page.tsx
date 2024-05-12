import SuggestedBar from '@/app/(main)/suggested-bar';
import IconProfile from '@/components/ui/icon-profile';
import { Lite } from '@/types/lite.type';
import React from 'react';

const testLite: Lite = {
  avatar:
    'https://scontent.fsgn24-1.fna.fbcdn.net/v/t39.30808-1/341166095_1287695245513783_5677951521827952093_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFTRxizbOenNB2VWOiV780vZSIHvA1DtEtlIge8DUO0S2UYcbCV2vnLZ7WOaVBj8WmtdGTbsuwfG2Kr9eo01lac&_nc_ohc=nMzMoOMx3AAQ7kNvgFnwmRL&_nc_ht=scontent.fsgn24-1.fna&oh=00_AfDWzyyHgcqEZ8r4dSd8egUT2DcGnWIOMMPJ6FHa7Jpz8A&oe=663D6D7B',
  content:
    'Aenean vitae porttitor magna, non venenatis tortor. In hac habitasse platea dictumst. Morbi sagittis, ante et condimentum malesuada, lectus arcu faucibus urna, eget eleifend ipsum metus et ligula.',
  createdAt: 'a hour ago',
  likesCount: 16,
  replysCount: 2,
  username: 'anhung_dep_try'
};
export default function Home() {
  return (
    <>
      {/* Main concept list xl:mr-[calc((100%-30rem)/2-16rem)] */}
      <div className='flex w-full justify-center xl:justify-normal'>
        <div className='mr-20 mt-2 w-full max-w-[30rem] xl:ml-[calc((100%-30rem)/2)]'>
          <div className='flex h-12 w-full items-center justify-between border-b border-gray-200 py-2'>
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
        </div>

        <SuggestedBar />
      </div>
    </>
  );
}
