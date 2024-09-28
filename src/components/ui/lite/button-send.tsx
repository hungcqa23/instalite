'use client';

import { Send } from '@/components/ui/icons';
import { toast } from '@/components/ui/toast/useToast';
import { useState } from 'react';

const ButtonSend = () => {
  const [copied, setCopied] = useState(false);
  const handleCopyUrl = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        toast({
          description: 'Lite URL copied to clipboard!',
          duration: 2000
        });
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <button
      onClick={() => {
        const url = window.location.href;
        handleCopyUrl(url);
      }}
    >
      <Send className='h-5 w-5 cursor-pointer' />
    </button>
  );
};

export default ButtonSend;
