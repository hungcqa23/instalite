'use client';

import { Send } from '@/components/icons';
import TickIcon from '@/components/icons/tick-icon';
import { toast } from '@/components/ui/toast/useToast';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ButtonSend = () => {
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const handleCopyUrl = (url: string) => {
    setIsCopying(true);

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        toast({
          description: 'Lite URL copied to clipboard!',
          duration: 1000
        });
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsCopying(false);
        }, 1000);
      });
  };

  return (
    <button
      onClick={() => {
        const url = window.location.href;
        handleCopyUrl(url);
      }}
      className='relative flex size-5 items-center justify-center'
    >
      <Send
        className={cn('size-5 cursor-pointer transition-opacity duration-500', {
          'opacity-0': isCopying,
          'opacity-100': !isCopying
        })}
      />

      <TickIcon
        className={cn('duration-400 absolute transition-opacity', {
          'opacity-0': !isCopying,
          'opacity-100': isCopying
        })}
      />
    </button>
  );
};

export default ButtonSend;
