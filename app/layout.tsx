import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import StoreProvider from './StoreProvider';
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from 'next-themes'
import {Roboto} from 'next/font/google'
import {TextColorProvider} from '@/context/TextColorProvider'
import NextTopLoaderWithColor from '@/components/NextTopLoaderWrapper/NextTopLoaderWithColor';


const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'MusicMates',
  description: 'MusicMates - это музыкальная социальная сеть',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <NextTopLoader showSpinner={false} /> */}
        <NextTopLoaderWithColor />
        <StoreProvider>
        <ThemeProvider>
          <TextColorProvider>

          <MainLayout>
            {/* <div style={{ backgroundColor: '#EDF1F5' }}>{children}</div> */}
            {children}
          </MainLayout>

          </TextColorProvider>

        </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
