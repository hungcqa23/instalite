import { Button } from '@/components/ui';
import { X } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import React from 'react';

const BtnClose = ({
  onClick,
  className,
  disabled = false
}: {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) => (
  <Button
    className={cn(
      'absolute right-0 top-0 z-10 hover:bg-transparent dark:hover:bg-transparent',
      className
    )}
    variant='ghost'
    onClick={onClick}
    disabled={disabled}
  >
    <X size={16} />
  </Button>
);

export default BtnClose;
