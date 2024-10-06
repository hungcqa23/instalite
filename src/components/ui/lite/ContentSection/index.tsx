import { Post } from '@/types/schema-validations/post.schema';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import Image from 'next/image';

interface MediaSectionProps {
  lite: Post;
}
const ContentSection: React.FC<MediaSectionProps> = ({ lite }) => {
  return (
    <>
      <p className='text-[0.8125rem]'>{lite?.content}</p>

      {lite?.media?.type === 0 && (
        <div className='my-2'>
          <Image
            src={lite.media.url}
            alt='image'
            width={430}
            height={430}
            className='rounded-md border-2'
          />
        </div>
      )}

      {lite?.media?.type === 1 && (
        <MediaPlayer
          src={`http://localhost:8000/files/video-hls/${lite._id}/master.m3u8`}
          viewType='video'
          streamType='on-demand'
          logLevel='warn'
          crossOrigin
          className='z-0 my-2'
          playsInline
          title='Sprite Fight'
          poster='https://files.vidstack.io/sprite-fight/poster.webp'
        >
          <MediaProvider />
          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      )}
    </>
  );
};
export default ContentSection;
