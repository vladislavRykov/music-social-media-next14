import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout/MainLayout';

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
        <MainLayout>
          {/* <div style={{ backgroundColor: '#EDF1F5' }}>{children}</div> */}
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
