import { isCurrentUserBlocked } from '@/actions/relations';
import Profile from '@/pages/Profile/Profile';
import { redirect } from 'next/navigation';
import React from 'react';

const page = ({ params }: { params: { nickname: string }; searchParams: {} }) => {
  return <Profile />;
};

export default page;
