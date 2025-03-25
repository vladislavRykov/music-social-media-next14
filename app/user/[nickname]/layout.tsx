import MainLayout from '@/components/layout/MainLayout/MainLayout';
import ProfileCap from '@/components/layout/ProfileLayout/ProfileCap/ProfileCap';
import ProfileLayout from '@/components/layout/ProfileLayout/ProfileLayout';
import ProfNav from '@/components/layout/ProfileLayout/ProfNav/ProfNav';
// import { Metadata } from 'next';
import React, { Suspense } from 'react';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
