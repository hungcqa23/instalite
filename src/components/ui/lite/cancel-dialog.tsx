import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';

const CancelDialogActions = ({
  cancelClose,
  confirmClose
}: {
  cancelClose: () => void;
  confirmClose: () => void;
}) => (
  <div className='flex flex-row border-t-2 dark:border-gray-600'>
    <div
      className='w-full cursor-pointer rounded-bl-3xl border-r-2 py-4 text-center dark:border-gray-600'
      onClick={cancelClose}
    >
      Cancel
    </div>
    <div
      className='w-full cursor-pointer rounded-br-3xl py-4 text-center font-semibold text-red-600'
      onClick={confirmClose}
    >
      Close
    </div>
  </div>
);

const CancelDialog = ({
  cancelClose,
  confirmClose,
  openCancelDialog,
  setOpenCancelDialog
}: {
  cancelClose: () => void;
  confirmClose: () => void;
  openCancelDialog: boolean;
  setOpenCancelDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
    <DialogContent className='select-none px-0 pb-0 pt-4 dark:bg-zinc-950 sm:max-w-[20rem]'>
      <DialogHeader>
        <DialogTitle className='mb-0 flex justify-center text-sm font-bold'>
          Close comment?
        </DialogTitle>
        <DialogClose asChild>
          <div className='absolute right-0 top-0 z-10 h-8 w-16 bg-white dark:bg-zinc-950' />
        </DialogClose>
      </DialogHeader>
      <CancelDialogActions cancelClose={cancelClose} confirmClose={confirmClose} />
    </DialogContent>
  </Dialog>
);

export default CancelDialog;
