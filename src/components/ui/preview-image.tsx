import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ImagePreviewProps {
  src: string;
  onDelete: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, onDelete }) => {
  return (
    <div className='relative h-auto w-[14rem]'>
      <Image
        src={src}
        width={240}
        height={240}
        alt={`selected ${src}`}
        className='h-auto w-auto max-w-[14rem] rounded-md object-cover'
      />
      <button
        className='absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-white'
        onClick={onDelete}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export { ImagePreview };
