import { SkeletonContainer } from '@/components/ui';
import { cn } from '@/lib/utils';

export default function PostsSkeleton({ className }: { className?: string }) {
  return (
    <SkeletonContainer className={cn('flex w-full flex-col items-center gap-5', className)}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div className='flex h-12 w-full max-w-[30rem] gap-2' key={index}>
          <div className='size-8 rounded-full bg-slate-200' />
          <div className='flex flex-grow flex-col gap-1'>
            <div className='size-1/3 rounded-full bg-slate-200' />
            <div className='h-1/3 w-full rounded-full bg-slate-200' />
            <div className='h-1/3 w-1/2 rounded-full bg-slate-200' />
          </div>
        </div>
      ))}
    </SkeletonContainer>
  );
}
