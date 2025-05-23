import MainLayout from '@/components/layout/MainLayout/MainLayout';
import SettingsLayout from '@/components/layout/SettingsLayout/SettingsLayout';
import ProfileCap from '@/components/layout/ProfileLayout/ProfileCap/ProfileCap';
import ProfNav from '@/components/layout/ProfileLayout/ProfNav/ProfNav';
// import { Metadata } from 'next';
import React from 'react';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SettingsLayout>{children}</SettingsLayout>
    </>
  );
}
