import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui';
import React from 'react';

interface SummarizationDialogProps {
  contentSummarization: {
    content: string;
    isOpenSummarizeDialog: boolean;
  };
  setContentSummarization: () => void;
}
export default function SummarizationDialog({
  contentSummarization,
  setContentSummarization
}: SummarizationDialogProps) {
  return (
    <Dialog
      open={contentSummarization.isOpenSummarizeDialog}
      onOpenChange={() => {
        setContentSummarization();
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center justify-center'>
            Gemini&apos;s AI Explanation
          </DialogTitle>
          <DialogDescription>{contentSummarization.content}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
