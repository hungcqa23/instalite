import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { cn } from '@/lib/utils';

const AvatarUser = ({
  src,
  className,
  classNameImage,
  fallback = 'IU'
}: {
  src?: string;
  className?: string;
  classNameImage?: string;
  fallback?: string;
}) => {
  return (
    <Avatar className={cn('size-8 cursor-pointer', className)}>
      <AvatarImage src={src} className={classNameImage} alt='@shadcn' />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export { AvatarUser };
