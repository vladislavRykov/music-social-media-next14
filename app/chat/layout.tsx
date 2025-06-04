import { isCurrentUserBlocked } from '@/actions/relations';
import ChatLayout from '@/components/layout/ChatLayout/ChatLayout';
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import ProfileCap from '@/components/layout/ProfileLayout/ProfileCap/ProfileCap';
import ProfileLayout from '@/components/layout/ProfileLayout/ProfileLayout';
import ProfNav from '@/components/layout/ProfileLayout/ProfNav/ProfNav';
import { redirect } from 'next/navigation';
// import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { toast } from 'react-toastify';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ChatLayout>{children}</ChatLayout>;
}
