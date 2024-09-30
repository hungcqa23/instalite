import { Button } from '@/components/ui';
import { X } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import React from 'react';

const BtnClose = ({ onClick, className }: { onClick: () => void; className?: string }) => (
  <Button
    className={cn(
      'absolute right-0 top-0 z-10 hover:bg-transparent dark:hover:bg-transparent',
      className
    )}
    variant='ghost'
    onClick={onClick}
  >
    <X size={16} />
  </Button>
);

export default BtnClose;
