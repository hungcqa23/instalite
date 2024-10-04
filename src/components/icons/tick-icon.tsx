import { SVGProps } from 'react';

export default function TickIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill='none'
      height={24}
      shapeRendering='geometricPrecision'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      stroke='#5C5F6A'
      viewBox='0 0 24 24'
      width={24}
      aria-hidden='true'
      style={{ width: 20, height: 20 }}
    >
      <path d='M20 6L9 17l-5-5' />
    </svg>
  );
}
