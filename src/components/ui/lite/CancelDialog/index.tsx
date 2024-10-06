import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';

interface CancelDialogActionsProps {
  cancelClose: () => void;
  confirmClose: () => void;
}

const CancelDialogActions: React.FC<CancelDialogActionsProps> = ({ cancelClose, confirmClose }) => (
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

interface CancelDialogProps {
  openCancelDialog: boolean;
  cancelClose: () => void;
  confirmClose: () => void;
  setOpenCancelDialog: (open: boolean) => void;
}

const CancelDialog: React.FC<CancelDialogProps> = ({
  openCancelDialog,
  cancelClose,
  confirmClose,
  setOpenCancelDialog
}) => (
  <Dialog
    open={openCancelDialog}
    onOpenChange={setOpenCancelDialog}
    aria-describedby='alert-dialog-title'
  >
    <DialogContent className='select-none px-0 pb-0 pt-4 dark:bg-zinc-950 sm:max-w-[20rem]'>
      <DialogHeader>
        <DialogTitle className='text-md mb-0 flex justify-center font-semibold'>
          Do you want to cancel?
        </DialogTitle>
      </DialogHeader>
      <CancelDialogActions cancelClose={cancelClose} confirmClose={confirmClose} />
    </DialogContent>
  </Dialog>
);

export default CancelDialog;
