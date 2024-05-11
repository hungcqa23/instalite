import Header from '@/components/ui/header';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='mt-16 flex h-screen w-screen flex-col items-center justify-start overflow-hidden'>
      <Header />
      {children}
    </main>
  );
}
