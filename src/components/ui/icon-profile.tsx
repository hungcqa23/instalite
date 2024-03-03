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
    src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    to = `/`,
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
