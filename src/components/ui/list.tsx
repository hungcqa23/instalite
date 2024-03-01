import { ElementType } from 'react';

interface ListProps<T> {
  listItems: T[];
  mapFn: (item: T, index: number) => React.ReactNode;
  className?: string;
  as?: ElementType;
}
export default function List<T>({
  listItems,
  mapFn,
  className,
  as: Element = 'div'
}: ListProps<T>) {
  return <Element className={className}>{listItems.map(mapFn)}</Element>;
}
