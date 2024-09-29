import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui';
import React from 'react';

export default function SummarizationDialog({
  contentSummarization,
  setContentSummarization
}: {
  contentSummarization: {
    content: string;
    isOpenSummarizeDialog: boolean;
  };
  setContentSummarization: () => void;
}) {
  return (
    <Dialog
      open={contentSummarization.isOpenSummarizeDialog}
      onOpenChange={() => {
        setContentSummarization();
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Content Explain</DialogTitle>
          <DialogDescription>{contentSummarization.content}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
