import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  ImagePreview,
  Input
} from '@/components/ui';
import { Clapperboard, ImageIcon, X } from '@/components/ui/icons';
import { User } from '@/types/schema-validations/account.schema';
import { MutableRefObject, useState } from 'react';

interface CommentFormProps {
  user: User | null;
  images: string[];
  videoUrl: string | null;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  videoFileInputRef: MutableRefObject<HTMLInputElement | null>;
  handleImageClick: () => void;
  handleVideoClick: () => void;
  handleCommentPost: (content: string) => void;
  handleDeleteImage: (index: number) => void;
  handleDeleteVideo: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommentForm = ({
  user,
  fileInputRef,
  textareaRef,
  videoFileInputRef,
  handleDeleteVideo,
  handleDeleteImage,
  handleImageClick,
  handleVideoClick,
  handleCommentPost,
  handleFileChange,
  handleVideoChange,
  images,
  videoUrl
}: CommentFormProps) => {
  const [text, setText] = useState('');

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex flex-row'>
        <Avatar className='h-8 w-8 cursor-pointer'>
          <AvatarImage src={user?.avatar} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='ms-2.5 flex max-w-full flex-col'>
          <div className='text-sm font-semibold'>{user?.username}</div>
          <textarea
            ref={textareaRef}
            placeholder='Write something...'
            className='max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm outline-none'
            rows={1}
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
          />

          {images.length == 0 && videoUrl == null && (
            <div className='flex flex-row gap-2'>
              <Button
                className='mt-2 flex w-[8rem] cursor-pointer gap-2 rounded-xl'
                variant='outline'
                onClick={handleImageClick}
              >
                <ImageIcon /> Add Image
              </Button>
              <Button
                className='mt-2 flex w-[8rem] cursor-pointer gap-2 rounded-xl'
                variant='outline'
                onClick={handleVideoClick}
              >
                <Clapperboard /> Add Video
              </Button>
            </div>
          )}

          <Input
            type='file'
            ref={fileInputRef}
            multiple={true}
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
          <Input
            type='file'
            ref={videoFileInputRef}
            accept='video/*'
            className='hidden'
            onChange={handleVideoChange}
          />

          {images.length > 0 && (
            <Carousel
              opts={{
                align: 'start'
              }}
              className='my-3 w-full max-w-full overflow-hidden'
            >
              <CarouselContent className='-ml-1 flex'>
                {images.map((image, index) => (
                  <CarouselItem key={index} className='basis-1/2 pl-1 pr-1'>
                    <ImagePreview src={image} onDelete={() => handleDeleteImage(index)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}

          {videoUrl && (
            <div className='relative my-3 max-h-[20rem] w-fit'>
              <video controls className='h-auto max-h-[20rem] w-auto rounded' autoPlay>
                <source src={videoUrl} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
              <Button
                className='absolute right-2 top-2 rounded-full bg-opacity-75'
                variant='ghost'
                onClick={handleDeleteVideo}
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className='mt-2 flex flex-row items-end justify-end'>
        <Button className='rounded-3xl' onClick={() => handleCommentPost(text)}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
