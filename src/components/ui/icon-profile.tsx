import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
  classNameImage?: string;
  to?: string;
  src?: string;
  isImage?: boolean;
  onClick?: () => void;
}
export default function IconProfile(props: Props) {
  const {
    className = 'h-8 w-8',
    classNameImage = 'h-full w-full',
    src = '/orbit.svg',
    to = `123`,
    isImage,
    onClick
  } = props;

  if (isImage) {
    return (
      <div className={'block shrink-0 ' + className}>
        <Image
          src={src}
          alt='Profile User'
          className={'rounded-full object-cover ' + classNameImage}
          width={32}
          height={32}
        />
      </div>
    );
  }

  return (
    <Link href={to} className={'block shrink-0 ' + className} onClick={onClick}>
      <Image
        src={src}
        alt='Profile User'
        className={'rounded-full object-cover ' + classNameImage}
        width={32}
        height={32}
      />
    </Link>
  );
}
