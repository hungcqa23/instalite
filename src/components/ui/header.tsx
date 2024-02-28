import Image from 'next/image';
export default function Header() {
  return (
    <header className='h-16 w-full bg-gray-50'>
      <Image src='/orbit.svg' alt='logo' width={56} height={56} />
    </header>
  );
}
