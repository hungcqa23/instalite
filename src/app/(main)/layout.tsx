import Header from '@/components/sections/header';

export const metadata = {
  title: {
    template: '%s • Instalite',
    default: 'Home • Instalite'
  },
  description:
    'A game-changing social media app that seamlessly blends sleek design, innovative features, and user-friendly functionality.'
};

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className='flex w-screen flex-col items-center justify-start'>
        {children}
      </main>
    </>
  );
}
