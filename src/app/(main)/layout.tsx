import Header from '@/components/ui/header';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className='flex w-screen flex-col items-center justify-start '>
        {children}
      </main>
    </>
  );
}
