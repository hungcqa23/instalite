import { Button } from '@/components/ui';
import React from 'react';

export default function BtnCreateLite({
  onClick,
  disabled
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <Button className='rounded-3xl' disabled={disabled} onClick={onClick}>
      Post
    </Button>
  );
}
