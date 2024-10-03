import { ElementType } from 'react';

interface ListProps<T> {
  listItems: T[];
  mapFn: (item: T, index: number) => React.ReactNode;
  className?: string;
  as?: ElementType;
}
const List = <T,>({ listItems, mapFn, className, as: Element = 'div' }: ListProps<T>) => {
  if (!listItems) return null;

  return <Element className={className}>{listItems.map(mapFn)}</Element>;
};

export { List };
