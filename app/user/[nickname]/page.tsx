import { getFavGenresByUsername } from '@/actions/genres';
import { isCurrentUserBlocked } from '@/actions/relations';
import { getUserProfByUserName } from '@/dal/user';
import Profile from '@/pages/Profile/Profile';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async({ params }: { params: { nickname: string }; searchParams: {} }) => {
  const res = await getFavGenresByUsername(params.nickname)
  const userRes = await getUserProfByUserName(params.nickname)
  return <Profile aboutMe={userRes?.aboutMe || null} faveGenresResponce={res} />;
};

export default page;
