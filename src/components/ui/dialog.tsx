import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole
} from '@floating-ui/react';
import { ElementType } from 'react';

interface Props {
  children: React.ReactNode;
  renderDialog: React.ReactNode;
  as?: ElementType;
  isOpen: boolean;
  className?: string;
  classNameOverlay?: string;
  disableUseDismiss?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Dialog({
  children,
  renderDialog,
  className,
  as: Element = 'div',
  disableUseDismiss = false,
  isOpen,
  setIsOpen,
  classNameOverlay = 'flex items-center justify-center bg-black/70'
}: Props) {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context);

  const dismiss = useDismiss(context, {
    enabled: !disableUseDismiss,
    outsidePressEvent: 'mousedown'
  });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  //Set up label and description ids
  const labelId = useId();
  const descriptionId = useId();

  return (
    <>
      <Element
        {...getReferenceProps()}
        ref={refs.setReference}
        className={className}
      >
        {children}
      </Element>

      {isOpen && (
        <FloatingPortal id={labelId}>
          <FloatingOverlay lockScroll className={classNameOverlay}>
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                aria-labelledby={labelId}
                aria-describedby={descriptionId}
                {...getFloatingProps()}
              >
                {renderDialog}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
}
