import { AppContextProvider as AppProvider } from '@/app/context';
import { ThemeProvider } from '@/app/context/theme-provider';
import { Toaster } from '@/components/ui/toast';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  icons: {
    icon: '/orbit.svg'
  },
  title: 'Instalite',
  description:
    'A game-changing social media app that seamlessly blends sleek design, innovative features, and user-friendly functionality.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden overflow-y-scroll`}>
        <AppProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
